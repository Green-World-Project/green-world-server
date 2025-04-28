import mongoose, { Types, Schema } from "mongoose";

export interface UserPlant {
    _id?: Types.ObjectId,
    plantID: Types.ObjectId,
    waterNeed?: number,
    groundArea: number,
    watering: Boolean,
    updatedAt?: Date,
    createdAt?: Date
};

const userPlantsSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantID: { type: Schema.Types.ObjectId, ref: "plants", required: true },
    waterNeed: { type: Number, required: true },
    groundArea: { type: Number, required: true },
    watering: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model(`UserPlants`, userPlantsSchema, `userPlants`);