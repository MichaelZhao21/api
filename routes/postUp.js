var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.post('/vision', function(req, res, next) {
    vision(req, res);
})

function decodeBase64Image(imageString) {
    return new Buffer(imageString, 'base64');
}

async function vision(req, res) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection(req.body.image);
    const labels = result.labelAnnotations;
    console.log(labels);
    
}  

module.exports = router;