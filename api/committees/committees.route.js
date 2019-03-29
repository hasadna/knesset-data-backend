const router = require('express').Router();
const collection = require('./committees.data.adapter');
const debug = require('../../services/log.service').debugBuilder(module.filename);

const requestCollection = (req, res, fn) => {
  const knessetNum = req.params['knessetNum'];
  const committeeId = req.params['committeeId'];
  const meetingId = req.params['meetingId'];
  // on dev - log
  debug(`:${req.route.path}`);
  // call collection function with route and callback
  fn(req.route.path, (d) => res.json(d), knessetNum, committeeId, meetingId);
};

// statistics of all committees per knesset
// collection:{knesset-id, knesset-name, #committees-per-knesset, #meetings-per-knesset}
const byKnessetStatistics = '/committees-by-knesset';
router.route(byKnessetStatistics)
    .get((req, res) => requestCollection(req, res, collection.all));

// committees data for specific knesset (id, name, meetings num)
// single:{knesset-id, knesset-name}
// collection:{committee-id,  committee-name, #meetings-per-knesset}
router.route('/committees-by-knesset/:knessetNum')
    .get((req, res) => requestCollection(req, res, collection.byKnessetId));

// all meetings of a specific committee (for specific knesset)
// single:{knesset-id, knesset-name, committee-id,  committee-name, mks-id-collection}
// collection:{meeting-id, meeting-name, meeting-date, has-protocol}
router.route('/committees-by-knesset/:knessetNum/:committeeId')
    .get((req, res) => requestCollection(req, res, collection.byCommitteeId));

// specific meeting data (protocol)
// single:{knesset-id, knesset-name, committee-id,  committee-name, meeting-id, meeting-name, meeting-date, mks-id-collection, general-protocol-data}
// collection:{speaker, mk-id(-1 if not mk), content }
router.route('/committees-by-knesset/:knessetNum/:committeeId/:meetingId')
    .get((req, res) => requestCollection(req, res, collection.byMeetingId));

module.exports = router;