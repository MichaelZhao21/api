var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var now = require('./now');

router.get('/', function (req, res, next) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    fs.appendFile(path.join(__dirname, 'files', 'logging', 'test'), `[${now()}] ${ip}`, () => {});
    res.send("hi");
});

module.exports = router;