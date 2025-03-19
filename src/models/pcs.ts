import mongoose, { Types, Schema } from "mongoose";

export interface Plant {
    _id?: Types.ObjectId,
    plantName: String,
    liter?: number,
    wateringTime: number,
    watering: Boolean,
    createdAt?: Date
}

const pcsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantName: { type: String, required: true },
    liter: Number,
    wateringTime: Number,
    watering: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model(`PCS`, pcsSchema, `pcs`);