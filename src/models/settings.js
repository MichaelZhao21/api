const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
    {
        name: String,
        data: [Object],
    },
    { collection: 'settings' }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;