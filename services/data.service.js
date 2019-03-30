const fs = require('fs');
const pg = require('pg');
// set logger namespace: debugBase:currentFile
const debug = require('./log.service').debugBuilder(module.filename);
const configFile = fs.readFileSync('./secrets/db.config.json');

let config;
// create a config to configure pooling behavior and client options
if (configFile) {
  config = JSON.parse(configFile.toString());
  // successfully read config file
  config.max = 10; // max number of clients in the pool
  config.idleTimeoutMillis = 30000; // how long a client is allowed to remain idle before being closed
} else {
  throw new Error('Cannot get Database config file');
}

const pool = new pg.Pool(config);

async function exeQuery(q) {
  const client = await pool.connect();
  let res;
  try {
    await client.query('BEGIN');
    try {
      res = await client.query(q);
      await client.query('COMMIT')
    } catch (err) {
      await client.query('ROLLBACK');
      throw err
    }
  } finally {
    client.release()
  }
  return res
}

// set cache
const NanoCache = require('nano-cache');
const cache = new NanoCache({
  ttl: config.dbCacheTtl || 60000,                     // max aged for cache entry - ttl 60 seconds
  bytes: 100 * NanoCache.SIZE.MB, // max memory use for data
});

async function getData(query, path) {
  cache.clearExpired();	// deletes all expired key with their values to free up memory

  const cachedData = cache.get(path);	// get from cache if available

  if (cachedData) {
    debug(`fetch data from Cache [TOKEN:${path}]`);
    return new Promise((resolve) => resolve(cachedData));	// returned cached data
  } else {
    debug(`fetch data from Database`);
    try {
      const {rows} = await exeQuery(query);
      cache.set(path, rows);
      return rows;
    } catch (err) {
      debug('Database ' + err)
    }
  }
}

module.exports.getDataAndCallback = (query, route, callback) => {
  getData(query, route).then(data => callback(data));
};