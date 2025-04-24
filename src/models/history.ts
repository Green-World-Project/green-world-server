import mongoose, { Types, Schema } from "mongoose";

export interface History {
    _id?: Types.ObjectId,
    fileName: String,
    info: {
        name: String,
        condition: String
    },
    createdAt?: Date
}

const historySchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    info: {
        name: { type: String, required: true },
        condition: { type: String, required: true }
    },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now, immutable: true }
});

historySchema.pre("save", function (next) {
    if (this.isNew) this.fileName = `${new mongoose.Types.ObjectId()}_${this.fileName}`;
    next();
});

export default mongoose.model(`History`, historySchema, `history`);