const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Dropbox = require('dropbox');
const creds = require('./files/creds.json');
const now = require('./now');
const dbx = new Dropbox.Dropbox({ accessToken: creds.dropbox.accessToken });

const CACHE_TIMEOUT = 3600000; // Cache gets deleted after an hour (3,600,000 ms)
var cache = {};

router.get(/\/.*[^upload]/, function (req, res, next) {
    console.log(`[${now()}] GET /images${req.path}`);

    // Check to see if files are in the cache
    if (Object.keys(cache).find(key => key === req.path)) {
        res.sendFile(cache[req.path]);
        return;
    }

    // Downlaod files from dropbox
    dbx.filesDownload({ path: req.path })
        .then((data) => {
            // Write image to file
            var filePath = path.join(__dirname, 'files', 'images', req.path.substring(1).replace('/', '-'));
            fs.writeFile(filePath, data.result.fileBinary, () => {
                // Send that file and save to cache
                // Then delete it after cache timeout
                res.sendFile(filePath);
                cache[req.path] = filePath;
                setTimeout(() => {
                    fs.unlink(filePath, () => {});
                    delete cache[filePath];
                }, CACHE_TIMEOUT);
            });
        })
        .catch(() => {
            // No file at path
            res.status(400);
            res.send({
                request: req.path,
                error: '400 Bad Request',
                description: `File not found at ${req.path}`,
            });
        });
});

router.post('/upload', function (req, res, next) {
    console.log(`[${now()}] POST /images/upload`);
    var form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            res.status(400);
            res.send({
                error: '400 Bad Request',
                description: `Invalid form response`,
            });
            return;
        }
        if (fields.pass !== process.env.ADMIN_PASS) {
            res.status(400);
            res.send({
                error: '400 Bad Request',
                description: `Invalid password`,
            });
            return;
        }
        fs.readFile(files.image.path, (err, data) => {
            dbx.filesUpload({ path: fields.path, contents: data })
                .then(() => {
                    res.sendStatus(200);
                })
                .catch((err) => {
                    res.status(400);
                    res.send({
                        error: err,
                        description: `Failed Dropbox API Call: Check your image blob format or path`,
                    });
                });
        });
    });
    return;
});

module.exports = router;
