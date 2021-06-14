const express = require('express');
const router = express.Router();
const Unsplash = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
const fetch = require('node-fetch');
const { randInt, sendError } = require('../functions/util');
const Photo = require('../models/photo');
const auth = require('../functions/auth');

// Provide polyfill for the Unsplash js API
// See https://github.com/unsplash/unsplash-js
global.fetch = fetch;

// Set default keywords for images to get
const keywords = ['mountains', 'trees', 'clouds', 'hills', 'landscape', 'ocean', 'stars', 'space'];

router.get('/', async function (req, res, next) {
    res.send(await getAllImages());
});

router.get('/random', async function (req, res, next) {
    const randomImage = await getRandomImage();
    res.setHeader('Cache-Control', 'no-store');
    res.send(randomImage[0]);
});

router.get('/id/:id', async function (req, res, next) {
    res.send(await getImageById(req.params.id));
});

router.post('/new', async function (req, res, next) {
    if (!auth(req, res)) return;
    const data = await retrieveNewImage();
    res.send(data);
});

router.post('/save', async function (req, res, next) {
    if (!auth(req, res)) return;
    if (req.body.id === undefined) {
        sendError(res, 400, 'ID not defined in the request body');
        return;
    }

    const saveRes = await saveImage(req.body.id);
    if (saveRes === 1) sendError(res, 400, 'Image already saved in the database');
    else if (saveRes === 2) sendError(res, 400, 'Invalid image ID');
    else if (saveRes === -1) sendError(res, 500, 'Could not save the requested image');
    else res.send({ status: 200, statusMessage: 'OK' });
});

async function getAllImages() {
    return Photo.find();
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

async function getImageById(id) {
    const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });
    try {
        const response = await unsplash.photos.getPhoto(id);
        const json = await toJson(response);
        unsplash.photos.downloadPhoto(json);
        return json;
    } catch (err) {
        return -1;
    }
}

async function saveImage(id) {
    if (await Photo.exists({ id })) return 1;

    const image = await getImageById(id);
    if (image === -1) return 2;

    const newImage = new Photo({
        id: image.id,
        imageUrl: image.urls.full,
        thumbUrl: image.urls.thumb,
        userName: image.user.name,
        userLink: image.user.links.html + '?utm_source=atab&utm_medium=referral',
    });
    newImage.save((err) => {
        if (err) {
            console.error(err);
            return -1;
        }
    });
    return newImage;
}

async function getRandomImage() {
    return await Photo.aggregate().sample(1).exec();
}

module.exports = router;
