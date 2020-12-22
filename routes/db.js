var express = require('express');
var router = express.Router();
var now = require('./now');

router.get('/', function (req, res, next) {
	console.log(`[${now()}] GET /db${req.path}`)
    res.send({ error: 404, message: 'No db or collection specified' });
});

module.exports = router;
