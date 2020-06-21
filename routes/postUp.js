var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.post('/vision', function(req, res, next) {
    fs.writeFile(__dirname + '/image.png', req.body.image, "base64", function(err) {
        console.log(err);
        vision(req, res);
    });
});

router.get('/image', function(req, res, next) {
    res.sendFile(__dirname + '/image.jpg');
});

async function vision(req, res) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection("https://api.michaelzhao.xyz/postup/image");
    const labels = result.labelAnnotations;
    console.log(labels);
    
}  

module.exports = router;