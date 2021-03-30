const mongoose = require('mongoose');

const usageSchema = new mongoose.Schema(
    {
        name: String,
        accessList: [String],
        count: Number,
    },
    { collection: 'usage' }
);

const Usage = mongoose.model('Usage', usageSchema);

module.exports = Usage;