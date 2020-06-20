var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

module.exports = router;