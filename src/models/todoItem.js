const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        priority: Number,
        due: Number,
        tags: [String],
    },
    { collection: 'todo' }
);

const TodoItem = mongoose.model('Todo Item', todoSchema);

module.exports = TodoItem;
