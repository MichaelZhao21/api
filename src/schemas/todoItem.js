const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        name: String,
        description: String,
        priority: Number,
        due: Number,
        tags: [String],
    }
);

module.exports = todoSchema;
