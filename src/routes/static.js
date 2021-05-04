const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Dropbox = require('dropbox');
const creds = require('../../creds.json');
const now = require('../functions/now');
const dbx = new Dropbox.Dropbox({ accessToken: creds.dropbox.accessToken });

const CACHE_TIMEOUT = 3600000; // Cache gets deleted after an hour (3,600,000 ms)
var cache = {};

// TODO: Clear cache on start

router.get(/\/(?!upload).*/, function (req, res, next) {
    // Check to see if files are in the cache
    if (Object.keys(cache).find((key) => key === req.path)) {
        res.sendFile(cache[req.path]);
        return;
    }

    // Downlaod files from dropbox
    console.log(req.path);
    dbx.filesDownload({ path: req.path })
        .then((data) => {
            // Write image to file
            const filePath = path.join(
                __dirname,
                '..',
                'temp',
                'images',
                req.path.substring(1).replaceAll('/', '--')
            );
            fs.writeFile(filePath, data.result.fileBinary, () => {
                // Send that file and save to cache
                // Then delete it after cache timeout
                res.sendFile(filePath);
                cache[req.path] = filePath;
                setTimeout(() => {
                    fs.unlink(filePath, () => {});
                    delete cache[req.path];
                }, CACHE_TIMEOUT);
            });
        })
        .catch((err) => {
            console.error(err);
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
    console.log(`[${now()}] POST /static/upload`);
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
