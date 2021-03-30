const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const now = require('../functions/now');
const Usage = require('../models/usageData');

// Connect to the DB
var connected = false;
const DB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@api-db.kxhun.mongodb.net/data?retryWrites=true&w=majority`;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => console.dir);

// Listen for connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connetion error:'));
db.once('open', () => {
    console.log('Connected to MongoDB!');
    connected = true;
});

// PATH: /usage
router.post('/', async function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');

    // Check for correct body
    if (!req.body.name) {
        res.status(400);
        res.send({ status: 400, error: "Missing 'name' in request body" });
        return;
    }

    // Check for MongoDB connection
    if (!connected) {
        res.status(500);
        res.send({ status: 500, error: 'Server not connected to MongoDB' });
        return;
    }

    // Get current time
    const time = now();

    // Find if document exists
    let document = await Usage.findOne({ name: req.body.name });
    if (document === null) {
        document = new Usage({ name: req.body.name, accessList: [time], count: 1 });
    } else {
        document.accessList = [...document.accessList, time];
    }

    // Update or insert the document
    await Usage.updateOne({ name: req.body.name }, { $set: {
        name: document.name,
        accessList: document.accessList,
        count: document.accessList.length,
    } }, { upsert: true });

    res.send(time);
});

module.exports = router;
