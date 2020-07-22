var express = require('express');
const Unsplash = require('unsplash-js').default;
var router = express.Router();
var keys = require('./files/unsplash.json');
const fetch = require('node-fetch');
const { toJson } = require('unsplash-js');
global.fetch = fetch;
const fs = require('fs');
const path = require('path');

const keywords = ['mountains', 'trees', 'clouds', 'hills', 'landscape', 'ocean', 'stars', 'space'];
const photoDataFile = path.join(__dirname, '/files/photoData.json');

router.get('/', function (req, res, next) {
    fs.readFile(photoDataFile, (err, rawData) => {
        if (err) return console.log(err);
        let data = JSON.parse(rawData);
        var oldDate = new Date(data.date);
        var currDate = new Date();
        if (oldDate.getDate() === currDate.getDate() && oldDate.getMonth() === currDate.getMonth() && oldDate.getFullYear() === currDate.getFullYear()) {
            console.log('yes');
            res.send(data.photo);
        }
        else {
            newImage().then((data) => {
                console.log(currDate.valueOf());
                fs.writeFile(photoDataFile, JSON.stringify({date: currDate.valueOf(), photo: data}, null, 2), (err, writeData) => {
                    if (err) return console.log(err);
                    res.send(data);
                });
            });
        }
    })
});

function newImage() {
	const unsplash = new Unsplash({ accessKey: keys.access });
	return unsplash.photos
		.getRandomPhoto({ query: keywords[randInt(0, keywords.length)], featured: true, orientation: 'landscape' })
		.then(toJson)
		.then((json) => {
			unsplash.photos.downloadPhoto(json);
            return json;
        });
}

function randInt(min, max) {
    return Math.random() * (max - min) + max;
}

module.exports = router;
