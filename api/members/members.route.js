const router = require('express').Router();
const collection = require('./members.data.adapter');
// Routes will be cached 60 seconds
// it is possible to cache each route separately. see https://www.npmjs.com/package/express-cache-route
// const cache = require('express-cache-route')({ expire: 60 });
// router.use(cache.route());

router.route('/members')
	.get((req, res) => {
		collection.all((data) => {
			res.json(data);
		});
	});

// router.route('/members/:itemId')
// 	.get((req, res) => {
// 		const id = req.params['itemId'];
// 		collection.getById(id, (data) => {
// 			res.json(data);
// 		});
// 	});

module.exports = router;