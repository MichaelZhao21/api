const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const Dropbox = require('dropbox');
const creds = require('./files/creds.json');
const dbx = new Dropbox.Dropbox({ accessToken: creds.dropbox.accessToken });

router.get(/\/.*[^upload\-callback]/, function (req, res, next) {
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
    console.log('POST /images/upload');
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
