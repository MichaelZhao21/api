var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hi UwU");
});

router.get('/hotdude', function(req, res, next) {
  res.sendFile(__dirname + '/ttt.png');
});

module.exports = router;
