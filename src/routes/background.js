var express = require('express');
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
var router = express.Router();
const fetch = require('node-fetch');
const { randInt } = require('../functions/util');

// Provide polyfill for the Unsplash js API
// See https://github.com/unsplash/unsplash-js
global.fetch = fetch;

// Set default keywords for images to get
const keywords = ['mountains', 'trees', 'clouds', 'hills', 'landscape', 'ocean', 'stars', 'space'];

router.get('/', async function (req, res, next) {
    res.send({ photo: 'gone' });
});

router.get('/new', async function (req, res, next) {
    const data = await retrieveNewImage();
    res.send(data);
});

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

async function getImageById(id) {
    const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });
    const response = await unsplash.photos.getPhoto(id);
    const json = await toJson(response);
    unsplash.photos.downloadPhoto(json);
    return json;
}

module.exports = router;
