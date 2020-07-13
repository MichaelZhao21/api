var express = require('express');
var router = express.Router();
var createHandler = require('github-webhook-handler');
var handler = createHandler({ path: '/pull' });

router.get('/', function (req, res, next) {
    res.send('github webhooks here');
    handler(req, res, function (err) {
        res.statusCode = 404
        res.end('no such location')
    })
});

handler.on('error', function (err) {
    console.error("Error: ", err.message);
});

handler.on('push', function (event) {
    console.log('Received a push event for %s to %s',
        event.payload.repository.name,
        event.payload.ref)
});

module.exports = router;