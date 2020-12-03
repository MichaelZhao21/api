var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();
var now = require('./now');

router.post('/', function (req, res, next) {
    res.header('Access-Control-Allow-Origin','*');
    if (!req.body.dir) {
        res.status(400);
        res.send({
            status: 400,
            error: "Missing 'dir' in request body",
        });
    }
    // Need to add to nginx config:
    // proxy_set_header X-Real-IP $remote_addr;
    var ip = req.header('X-Real-IP') || req.connection.remoteAddress;
    fs.appendFile(path.join(__dirname, 'files', 'logging', req.body.dir), `[${now()}] ${ip}\n`, () => {});
    res.sendStatus(200);
});

module.exports = router;
