const mongoose = require('mongoose');

// See full schema at https://newsapi.org/docs/endpoints/top-headlines
const newsSchema = new mongoose.Schema({
    id: Number,
    time: Number,
    data: Object,
}, { collection: 'news' });

const News = mongoose.model('News', newsSchema);
module.exports = News;