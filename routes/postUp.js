var express = require('express');
var router = express.Router();
const {Storage} = require('@google-cloud/storage');

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.get('/vision', function(req, res, next) {
    var x = vision();
})

function vision() {
    
}

module.exports = router;