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
const byKnessetStatistics = '/legislation';
router.route(byKnessetStatistics)
    .get((req, res) => requestCollection(req, res, collection.all));

router.route('/legislation-by-knesset')
    .get((req, res) => requestCollection(req, res, collection.countByKnessetNum));

// legislation data for specific knesset
router.route('/legislation-by-knesset/:knessetNum')
    .get((req, res) => requestCollection(req, res, collection.byKnessetNum));

module.exports = router;