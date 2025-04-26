import mongoose, { Types, Schema } from "mongoose";
import { number } from "yup";

export interface UserPlant {
    _id?: Types.ObjectId,
    plantID: Types.ObjectId,
    waterNeed?: number,
    groundArea: number,
    updatedAt?: Date,
    createdAt?: Date
}

const userPlantsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantID: { type: Schema.Types.ObjectId, ref: "plants", required: true },
    waterNeed: { type: Number, required: true },
    groundArea: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now, immutable: true }
});

export default mongoose.model(`UserPlants`, userPlantsSchema, `userPlants`);