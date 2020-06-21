var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.post('/vision', function(req, res, next) {
    fs.writeFile('image.png', req.body.image, 'base64', function(err) {
        // vision(res)
        console.log(err);
        res.send("huh\n");
    });
    // vision(res);
})

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