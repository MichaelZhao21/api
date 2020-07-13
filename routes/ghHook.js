var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('github webhooks here');
});

router.post('/pull', function (req, res, next) {
    console.log(req.body);
    res.status(200);
});

module.exports = router;
