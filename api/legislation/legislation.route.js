const router = require('express').Router();
const collection = require('./legislation.data.adapter');
const debug = require('debug')('legislation route');
const whereParser = require('../../services/pg.escape.service').requestToWhereClause;

const requestCollection = (req, res, fn) => {
  const params = {
    knessetNum: Number(req.params['knessetNum'])
  };
  const options = {
    page: Number(req.query['page'] || 1) - 1,
    where: whereParser(req.query, ["PrivateNumber", "SubTypeID", "BillID", "StatusID"], ["Name", "SubTypeDesc"]) || "true"
  };
//   const knessetNum = Number(req.params['knessetNum']);
//   const page = Number(req.query['page'] || 1) - 1;
//   const where = whereParser(req.query, ["PrivateNumber", "SubTypeID", "BillID", "StatusID"], ["Name", "SubTypeDesc"]) || "true";
  // on dev - log
  debug(`:${req.route.path}`);
  // call collection function with route and callback
  fn(req.route.path, (d) => res.json(d), params, options);
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