const mongoose = require('mongoose');

const taskTabSchema = new mongoose.Schema(
    {
        name: String,
        uid: String,
        tags: [
            {
                char: String,
                text: String,
            },
        ],
    },
    { collection: 'users' }
);

module.exports = taskTabSchema;
