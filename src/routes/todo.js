const express = require('express');
const router = express.Router();
const { sendError } = require('../functions/util');
const { TaskTabUser, connection } = require('../schemas/taskTabConnection');
const todoSchema = require('../schemas/todoItem');

router.get('/:username', async function (req, res, next) {
    const user = await TaskTabUser.findOne({ name: req.params.username });
    if (user === null) {
        sendError(res, 400, 'Invalid username');
        return;
    }

    const TodoItem = connection.model('Todo Item', todoSchema, user.uid);
    const list = await TodoItem.find();
    res.send(list);
});

router.post('/edit', function (req, res, next) {});

module.exports = router;
