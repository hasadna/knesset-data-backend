const router = require('express').Router();
const collection = require('./news.data.adapter');


router.route('/news')
	.get((req, res) => {
		collection.all((data) => {
			res.json(data);
		});
	});

module.exports = router;