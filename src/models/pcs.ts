import mongoose, { Types, Schema } from "mongoose";

export interface PCS {
    plantName: String,
    wateringTime: number,
    watering: Boolean
}

const pcsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantName: { type: String, required: true },
    wateringTime: Number,
    watering: { type: Boolean, default: false }
});

export default mongoose.model(`PCS`, pcsSchema, `pcs`);