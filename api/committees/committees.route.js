const router = require('express').Router();
const collection = require('./committees.data.adapter');

router.route('/committees')
	.get((req, res) => {
		collection.all((data) => {
			res.json(data);
		});
	});

router.route('/committees/:itemId')
	.get((req, res) => {
		const id = req.params['itemId'];
		collection.getById(id, (data) => {
			res.json(data);
		});
	});

router.route('/committees/:itemId/:meetingId')
	.get((req, res) => {
		const id = req.params['meetingId'];
		collection.getByMeeting(id, (data) => {
			res.json(data);
		});
	});

module.exports = router;