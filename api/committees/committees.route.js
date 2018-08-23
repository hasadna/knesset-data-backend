const router = require('express').Router();
const collection = require('./committees.data.adapter');
// Routes will be cached 60 seconds
// it is possible to cache each route separately. see https://www.npmjs.com/package/express-cache-route
// const cache = require('express-cache-route')();
// router.use(cache.route());


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