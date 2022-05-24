import express from 'express';
import Link from '../models/link';

const router = express.Router();

/* GET /link */
router.get('/', async (req, res, next) => {
    const linkRes = await Link.find({});
    const links = linkRes.map((l) => ({ short: l['short'], full: l['full'] }));
    res.send({ status: 200, links });
});

/* GET /link/<short> */
router.get('/:short', async (req, res, next) => {
    // Find link and check for existence
    const linkRes = await Link.find({ short: req.params['short'] }).limit(1);
    if (linkRes.length === 0) {
        res.status(404);
        res.send({ status: 404, message: `Link ${req.params['short']} does not exist!` });
        return;
    }

    // Redirect user to link
    res.redirect(linkRes[0]['full']);
});

/* POST /link */
router.post('/', async (req, res, next) => {
    // Check for correct parameters
    if (req.body['short'] === undefined || req.body['full'] === undefined) {
        res.status(400);
        res.send({ status: 400, message: 'short and full properties are required in request body!'});
        return;
    }

    // Check if link already exists
    const linkRes = await Link.find({ short: req.body['short'] });
    if (linkRes.length !== 0) {
        res.status(400);
        res.send({ status: 400, message: 'Link already exists', currentFull: linkRes[0]['long'] });
        return;
    }

    // Create the url
    const newLink = new Link({
        short: req.body['short'],
        full: req.body['full'],
    });
    await newLink.save();

    // Send success
    res.send({
        status: 200,
        message: 'Successfully added new link!',
        short: req.body['short'],
        full: req.body['full'],
    });
});

export default router;
