const express = require('express');
const router = express.Router();
const Dropbox = require('dropbox');
const creds = require('./files/creds.json');
const dbx = new Dropbox.Dropbox({ accessToken: creds.dropbox.accessToken });

// TODO: Add upload path for only me
router.get(/\/.*/, function (req, res, next) {
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

module.exports = router;
