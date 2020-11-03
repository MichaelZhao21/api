var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function (req, res, next) {
    // TOOD: This will be replaced with a email verification and API keygen for the user
    console.log('GET /');
    res.send({
        greeting:
            "Hello! Here's the temporary API key while I set things up! Hope you have a great day/night :DDD",
        key: 'owoverysecretkey12345',
    });
});

router.get('/admin', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

router.get('/admin-check', function (req, res, next) {
    console.log(req.query)
    if (req.query.pass === process.env.ADMIN_PASS)
        res.redirect(`${req.protocol}://${req.get('host')}/admin-dashboard`);
    else res.redirect(`${req.protocol}://${req.get('host')}/admin`);
});

router.get('/admin-dashboard', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'html', 'admin.html'));
})

module.exports = router;
