var express = require('express');
var router = express.Router();
var fs = require('fs');
const axios = require('axios');

router.get('/', function (req, res, next) {
    res.send("UwU Mikey is HERE YASSSSS");
});

router.post('/vision', function (req, res, next) {
    fs.writeFile(__dirname + '/image.png', req.body.image, "base64", function (err) {
        console.log(err);
        vision(res);
    });
});

router.get('/image', function (req, res, next) {
    res.sendFile(__dirname + '/image.png');
});

async function vision(res) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.labelDetection("https://api.michaelzhao.xyz/postup/image");
    const labels = result.labelAnnotations;
    
    console.log(labels);
    getQuotes(labels, res);
}

function getQuotes(labels, res) {
    var quotes = [];
    const options = {
        headers: { 'Authorization': 'Token 8dba24d3822fbcc2be30a9988e4ce8db5bb2e438' }
    };

    axios.get("https://api.paperquotes.com/apiv1/quotes/?tags=" + labels[0].description.toLowerCase(), options)
        .then(function (response) {
            if (response.data.results.length != 0) {
                quotes.push({ label: labels[0], quote: response.data.results[0].quote });
                console.log("-----------------------------------------");
                console.log(quotes);
                res.send({ quotes });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    return null;
}

module.exports = router;