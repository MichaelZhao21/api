const express = require('express');
const router = express.Router();
const now = require('./now');
const { MongoClient, ObjectId } = require('mongodb');

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@api-db.kxhun.mongodb.net/blog?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => console.log('Connected to mongodb'));

router.get('/', async function (req, res, next) {
    console.log(`[${now()}] GET /db${req.path}`);
    if (req.path == '/') {
        res.status(400);
        res.send({ error: 400, message: 'No db or collection specified' });
        return;
    }
    else if (req.path.startsWith('/blog')) {
        blog(req, res);
        return;
    }
    const fields = req.path.substring(1).split('/');
    if (fields.length != 2) {
        res.status(400);
        res.send({
            error: 400,
            message:
                'Invalid format: GET https://api.michaelzhao.xyz/db/[database]/[collection]?field=[searchField]&value=[searchData]',
        });
        return;
    }
    const db = client.db(fields[0]);
    const collection = db.collection(fields[1]);
    var findObj = {};
    if (req.query.field != undefined && req.query.value != undefined) {
        if (req.query.field == 'id') findObj._id = ObjectId(req.query.value);
        else findObj[req.query.field] = req.query.value;
    }
    console.log(findObj)
    res.send(await collection.find(findObj).toArray());
});

function blog(req, res) {

}

module.exports = router;
