const express = require('express');
const { sendError } = require('../functions/util');
const Settings = require('../models/settings');
const TodoItem = require('../models/todoItem');
const router = express.Router();

router.get('/', async function (req, res, next) {
    const list = await TodoItem.find();
    res.send(list);
});

router.get('/settings', async function (req, res, next) {
    const settings = await Settings.findOne({ name: 'todo' });
    res.send(settings.data[0]);
});

router.post('/settings', async function (req, res, next) {
    await Settings.findOneAndUpdate({ name: 'todo' }, { data: req.body });
    res.send({ status: 200, message: `Successfully updated todo tags!` });
});

router.post('/', async function (req, res, next) {
    const data = req.body;
    if (data === null || data === undefined) {
        sendError(res, 400, 'No data defined');
        return;
    }

    console.log(data);

    const item = new TodoItem({
        name: data.name,
        description: data.description,
        priority: data.priority,
        due: data.due,
        tags: data.tags,
    });

    const result = await item.save();
    res.send({ status: 200, message: `Successfully added a new item; id: ${item._id}` });
});

router.post('/:id', async function (req, res, next) {
    const data = req.body;
    if (data === null || data === undefined) {
        sendError(res, 400, 'No data defined');
        return;
    }

    const item = new TodoItem({
        name: data.name,
        description: data.description,
        priority: data.priority,
        due: data.due,
        tags: data.tags,
    });

    let result = await TodoItem.findByIdAndUpdate(req.params.id, req.body);
    res.send({ status: 200, message: `Successfully editied item; id: ${item._id}` });
});

module.exports = router;
