var express = require('express');
var path = require('path');
var router = express.Router();
var now = require('../functions/now');

router.get('/', function (req, res, next) {
    console.log(`[${now()}] GET ${req.path}`);
    res.send({
        greeting: "Hello! My API is a mess rn LMAO :'DDD Have a good day hehe",
        key: 'verysecretkeyOwO',
    });
});

router.get('/admin', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'admin.html'));
});

module.exports = router;
