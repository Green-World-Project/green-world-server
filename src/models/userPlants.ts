import mongoose, { Types, Schema } from "mongoose";

export interface userPlant {
    _id?: Types.ObjectId,
    plantName: String,
    groundArea: number
}

const userPlantsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantID: { type: Schema.Types.ObjectId, ref: "plant", required: true },
    plantName: { type: String, required: true },
    groundArea: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now, immutable: true }
});

export default mongoose.model(`UserPlants`, userPlantsSchema, `userPlants`);