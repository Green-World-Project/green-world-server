import mongoose, { Types, Schema } from "mongoose";

export interface PlantCare {
    _id?: Types.ObjectId,
    plantID: Types.ObjectId,
    waterNeed?: number,
    groundArea: number,
    isWatered: Boolean,
    lastWateredAt: Date,
    createdAt?: Date,
    updatedAt?: Date
};

const plantCareSchema = new mongoose.Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
    plantID: { type: Schema.Types.ObjectId, ref: "plants", required: true },
    waterNeed: { type: Number, required: true },
    groundArea: { type: Number, required: true },
    isWatered: { type: Boolean, default: false },
    lastWateredAt: { type: Date, default: null },
}, { timestamps: true });

plantCareSchema.pre('save', function (next) {
    if (this.isWatered === true)
        this.lastWateredAt = new Date();
    next();
});

plantCareSchema.pre('updateOne', function (next) {
    const update = this.getUpdate();
    if (update && (update as mongoose.UpdateQuery<PlantCare>).isWatered === true)
        (update as mongoose.UpdateQuery<PlantCare>).lastWateredAt = new Date();
    next();
});

export default mongoose.model(`PlantCare`, plantCareSchema, `plant_care_system`);