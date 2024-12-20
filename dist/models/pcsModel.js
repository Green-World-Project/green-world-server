"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const folderSchema = new mongoose_1.default.Schema({
    folders: [
        {
            plantName: { Type: String, required: true },
            wateringTime: Number,
            watering: { Type: Boolean, default: false },
            // wateringTimer: 
        }
    ]
});
const pcsSchema = new mongoose_1.default.Schema({
    userID: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: `User`
    },
    folders: folderSchema
});
exports.default = mongoose_1.default.model(`PCS`, pcsSchema, `pcs`);
