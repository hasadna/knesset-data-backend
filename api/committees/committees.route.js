const router = require('express').Router();
const collection = require('./committees.data.adapter');

// statistics of all committees per knesset
// collection:{knesset-id, knesset-name, #committees-per-knesset, #meetings-per-knesset}
router.route('/committees-by-knesset')
    .get((req, res) => {
        collection.all(req.route.path, (d) => res.json(d));
    });

// committees data for specific knesset (id, name, meetings num)
// single:{knesset-id, knesset-name}
// collection:{committee-id,  committee-name, #meetings-per-knesset}
router.route('/committees-by-knesset/:knessetId')
    .get((req, res) => {
        const knessetId = req.params['knessetId'];
        collection.byKnessetId(req.route.path, (d) => res.json(d), knessetId);
    });

// all meetings of a specific committee (for specific knesset)
// single:{knesset-id, knesset-name, committee-id,  committee-name, mks-id-collection}
// collection:{meeting-id, meeting-name, meeting-date, has-protocol}
router.route('/committees-by-knesset/:knessetId/:committeeId')
    .get((req, res) => {
        const knessetId = req.params['knessetId'];
        const committeeId = req.params['committeeId'];
        collection.byCommitteeId(req.route.path, (d) => res.json(d), knessetId, committeeId);
    });

// specific meeting data (protocol)
// single:{knesset-id, knesset-name, committee-id,  committee-name, meeting-id, meeting-name, meeting-date, mks-id-collection, general-protocol-data}
// collection:{speaker, mk-id(-1 if not mk), content }
router.route('/committees-by-knesset/:knessetId/:committeeId/:meetingId')
    .get((req, res) => {
        const knessetId = req.params['knessetId'];
        const committeeId = req.params['committeeId'];
        const meetingId = req.params['meetingId'];
        collection.byMeetingId(req.route.path, (d) => res.json(d), knessetId, committeeId, meetingId);
    });

module.exports = router;