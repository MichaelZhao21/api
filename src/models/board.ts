import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema(
    {
        name: String,
        pins: [String],
    },
    { collection: 'board' }
);

interface BoardObject {
    name: string;
    pins: string[];
}
interface BoardDocument extends Document, BoardObject {}

const Board = mongoose.model<BoardDocument>('Board', boardSchema);

export default Board;
