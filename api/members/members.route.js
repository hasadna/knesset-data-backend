const router = require('express').Router();
const collection = require('./members.data.adapter');

router.route('/members')
    .get((req, res) => {
      collection.all((data) => {
        res.json(data);
      });
    });

router.route('/members/:itemId')
    .get((req, res) => {
      const id = req.params['itemId'];
      collection.getById(id, (data) => {
        res.json(data);
      });
    });

module.exports = router;