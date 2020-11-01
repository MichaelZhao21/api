var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    // TOOD: This will be replaced with a email verification and API keygen for the user
    console.log('GET /')
    res.send({
        greeting:
            "Hello! Here's the temporary API key while I set things up! Hope you have a great day/night :DDD",
        key: 'owoverysecretkey12345'
    });
});

module.exports = router;
