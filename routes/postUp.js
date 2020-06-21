var express = require('express');
var router = express.Router();
const {Storage} = require('@google-cloud/storage');

router.get('/', function(req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.get('/vision', function(req, res, next) {
    vision(res);
})

async function vision(res) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');
  
    var pic = 'https://api.michaelzhao.xyz/hotdude';

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
  
    // Performs label detection on the image file
    const [result] = await client.labelDetection(pic);
    const labels = result.labelAnnotations;
    res.send(labels);
}  

module.exports = router;