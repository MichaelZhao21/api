import mongoose from 'mongoose';

// See full schema at https://newsapi.org/docs/endpoints/top-headlines
const newsSchema = new mongoose.Schema(
    {
        id: Number,
        time: Number,
        data: Object,
    },
    { collection: 'news' }
);

interface NewsObject {
    id: number;
    time: number;
    data: object;
}
interface NewsDocument extends Document, NewsObject {}

const News = mongoose.model<NewsDocument>('News', newsSchema);

export default News;
