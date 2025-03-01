import mongoose, { Schema } from "mongoose";

export interface History {
    userID: String,
    fileName: String,
    info: {
        name: String,
        condition: String
    }
}

const historySchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    info: {
        name: { String, required: true },
        condition: { String, required: true }
    }
});

historySchema.pre("save", function (next) {
    if (this.isNew) this.fileName = `${new mongoose.Types.ObjectId()}_${this.fileName}`;
    next();
});

export default mongoose.model(`History`, historySchema, `history`)
