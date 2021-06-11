const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema(
    {
        id: String,
        imageUrl: String,
        thumbUrl: String,
        userName: String,
        userLink: String,
    },
    { collection: 'photos' }
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;