var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var now = require('./now');

router.get('/', function (req, res, next) {
    // Need to add to nginx config:
    // proxy_set_header X-Real-IP $remote_addr;
    var ip = req.header('X-Real-IP') || req.connection.remoteAddress;
    fs.appendFile(path.join(__dirname, 'files', 'logging', 'test'), `[${now()}] ${ip}\n`, () => {});
    res.send("hi");
});

module.exports = router;
