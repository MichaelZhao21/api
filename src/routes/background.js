var express = require('express');
const Unsplash = require('unsplash-js').default;
var router = express.Router();
const fetch = require('node-fetch');
const { toJson } = require('unsplash-js');
const fs = require('fs');
const path = require('path');
const { randInt } = require('../functions/util');

// Why does this exist???
global.fetch = fetch;

const keywords = ['mountains', 'trees', 'clouds', 'hills', 'landscape', 'ocean', 'stars', 'space'];
const photoDataFile = path.join(__dirname, '..', 'temp/photoData.json');

router.get('/', async function (req, res, next) {
    fs.readFile(photoDataFile, (err, rawData) => {
        if (err) return console.log(err);
        let data = JSON.parse(rawData);
        var oldDate = new Date(data.date);
        var currDate = new Date();
        if (
            oldDate.getDate() === currDate.getDate() &&
            oldDate.getMonth() === currDate.getMonth() &&
            oldDate.getFullYear() === currDate.getFullYear()
        ) {
            res.send(data.photo);
        } else {
            getNewPhoto(res);
        }
    });
});

router.get('/new', async function (req, res, next) {
    getNewPhoto(res);
});

function getNewPhoto(res) {
    var currDate = new Date();
    retrieveNewImage().then((data) => {
        fs.writeFile(
            photoDataFile,
            JSON.stringify({ date: currDate.valueOf(), photo: data }, null, 2),
            (err, writeData) => {
                if (err) return console.log(err);
                res.send(data);
            }
        );
    });
}

async function retrieveNewImage() {
    const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });
    const response = await unsplash.photos.getRandomPhoto({
        query: keywords[randInt(0, keywords.length)],
        featured: true,
        orientation: 'landscape',
    });
    const json = await toJson(response);
    unsplash.photos.downloadPhoto(json);
    return json;
}

module.exports = router;
