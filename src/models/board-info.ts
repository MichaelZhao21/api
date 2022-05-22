import mongoose from 'mongoose';

const boardInfoSchema = new mongoose.Schema(
    {
        name: String,
        items: Number,
        busy: Boolean,
    },
    { collection: 'boardInfo' }
);

interface BoardInfoObject {
    name: string;
    items: number;
    busy: boolean;
}
interface BoardInfoDocument extends Document, BoardInfoObject {}

const BoardInfo = mongoose.model<BoardInfoDocument>('BoardInfo', boardInfoSchema);

export default BoardInfo;
