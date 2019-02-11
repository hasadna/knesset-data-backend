const pg = require('pg');
// create a config to configure pooling behavior and client options
const config = {
	user: 'redash_reader',
	database: 'postgres',
	password: 'Shr4mgutTUGGXLZn7spc',
	host: 'knesset-data-publicdb.oknesset.org', // Server hosting the postgres database
	port: 5432,
	max: 10, // max number of clients in the pool
	idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

async function exeQuery (q) {
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
	ttl: 60000,                      // max aged for cache entry - ttl 60 seconds
	bytes : 100 * NanoCache.SIZE.MB, // max memory use for data
});

module.exports.getData = async (query, route) => {
	cache.clearExpired();	// deletes all expired key with their values to free up memory

	const cachedData = cache.get(route);	// get from cache if available

	if(cachedData) {
		// TODO: replace with debug
		console.log(`fetch data from Cache`);
		return new Promise((resolve) => resolve(cachedData));	// returned cached data
	} else {
		// TODO: replace with debug
		console.log(`fetch data from Database`);
		try {
			const { rows } = await exeQuery(query);
			cache.set(route, rows);
			return rows;
		} catch (err) {
			// TODO: replace with debug
			console.log('Database ' + err)
		}
	}
};