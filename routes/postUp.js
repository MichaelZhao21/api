var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.post('/vision', function(req, res, next) {
    console.log(req.body);
    console.log(req);
    res.send("HI");
    // fs.writeFile("text.txt", req.body, function(err) {
    //     console.log(err);
    // })
    // fs.writeFile('image.jpg', req.body, 'base64', function(err) {
    //     console.log(err);
    //     res.send("hi\n");
    // })
    // vision(res);
})

function decodeBase64Image(imageString) {
    return new Buffer(imageString, 'base64');
}

async function vision() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection('./image.png');
    const labels = result.labelAnnotations;
    console.log(labels);
    
}  

module.exports = router;