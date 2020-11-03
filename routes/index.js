var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res, next) {
    // TOOD: This will be replaced with a email verification and API keygen for the user
    console.log('GET /');
    res.send({
        greeting:
            "Hello! Here's the temporary API key while I set things up! Hope you have a great day/night :DDD",
        key: 'verysecretkeyOwO314',
    });
});

router.get('/admin', function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = router;
