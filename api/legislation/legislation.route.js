const router = require('express').Router();
const collection = require('./legislation.data.adapter');
const debug = require('debug')('legislation route');

const requestCollection = (req, res, fn) => {
  const knessetNum = req.params['knessetNum'];
  // on dev - log
  debug(`:${req.route.path}`);
  // call collection function with route and callback
  fn(req.route.path, (d) => res.json(d), knessetNum);
};

// statistics of all legislation per knesset
const byKnessetStatistics = '/legislation-by-knesset';
router.route(byKnessetStatistics)
    .get((req, res) => requestCollection(req, res, collection.all));

// legislation data for specific knesset
router.route('/legislation-by-knesset/:knessetNum')
    .get((req, res) => requestCollection(req, res, collection.byKnessetId));


module.exports = router;