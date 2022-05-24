import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
    {
        short: String,
        full: String,
    },
    { collection: 'link' }
);

interface LinkObject {
    short: string;
    full: string;
}
interface LinkDocument extends Document, LinkObject {}

const Link = mongoose.model<LinkDocument>('Links', linkSchema);

export default Link;
