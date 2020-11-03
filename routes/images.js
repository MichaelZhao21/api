const express = require('express');
const router = express.Router();
const Dropbox = require('dropbox');
const creds = require('./files/creds.json');
const dbx = new Dropbox.Dropbox({ accessToken: creds.dropbox.accessToken });

router.get(/\/.*[^upload-callback]/, function (req, res, next) {
    console.log(`GET /images${req.path}`);
    dbx.filesDownload({ path: req.path })
        .then((data) => {
            res.send(data.result.fileBinary);
        })
        .catch(() => {
            res.status(400);
            res.send({
                request: req.path,
                error: '400 Bad Request',
                description: `File not found at ${req.path}`,
            });
        });
});

router.post('/upload', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');

    if (req.body.image === undefined || req.body.path === undefined) {
        res.status(400);
        res.send({
            request: req.body,
            error: '400 Bad Request',
            description: `Request did not include 'image' and 'path' fields`,
        });
    }

    dbx.filesUpload({ path: req.body.path, contents: req.body.image })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.status(400);
            res.send({
                request: req.body,
                error: err,
                description: `Failed Dropbox API Call: Check your image blob format or path`,
            });
        });
});

module.exports = router;
