import express from 'express';
import dayjs from 'dayjs';
import fetch from 'node-fetch';

import { sendError } from '../util';
import News from '../models/news';

const router = express.Router();

/* /news */
router.get('/', async function (req, res, next) {
    const oldNews = await News.findOne({ id: 1 });
    if (!oldNews || !dayjs(oldNews.time).isSame(dayjs(), 'hour')) {
        const newNews = await fetch(
            `https://newsapi.org/v2/top-headlines?sources=bbc-news,associated-press,google-news&apiKey=${process.env.NEWS_API_KEY}`
        ).then((data) => data.json());
        if (newNews['status'] !== 'ok') {
            sendError(res, 500, 'Unable to retrieve new news :(');
            return;
        }
        const newsRes = await News.updateOne(
            { id: 1 },
            { $set: { time: dayjs().valueOf(), data: newNews }, $setOnInsert: { id: 1 } },
            { upsert: true }
        );
        if (newsRes.n !== 1) {
            sendError(res, 500, 'Unable to retrieve new news :(');
            return;
        }
        res.send(newNews);
        return;
    }
    res.send(oldNews.data);
    return;
});

export default router;
