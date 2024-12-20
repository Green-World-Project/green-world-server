import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    folders: [
        {
            plantName: { Type: String, required: true },
            wateringTime: Number,
            watering: { Type: Boolean, default: false },
            // wateringTimer: 
        }
    ]
})

const pcsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    folders: folderSchema
});

export default mongoose.model(`PCS`, pcsSchema, `pcs`)