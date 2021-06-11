var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', async function (req, res, next) {
    res.send(
        await fetch(
            `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.NYT_API_KEY}`
        ).then((d) => d.json())
    );
});

module.exports = router;
