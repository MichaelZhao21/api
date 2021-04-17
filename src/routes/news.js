var express = require('express');
var router = express.Router();
const { sendError } = require('../functions/util');

router.get('/', async function (req, res, next) {
    const key = process.env.NYT_API_KEY;
    if (key === undefined) {
        sendError(res, 404, 'News API keys are not defined');
        return;
    }
    res.send(
        await fetch(
            `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${key}`
        ).then((d) => d.json())
    );
});

module.exports = router;
