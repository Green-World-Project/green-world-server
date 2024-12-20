"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const plantInfoSchema = new mongoose_1.default.Schema({
    name: { String, required: true },
    info: { String, required: true }
});
const historySchema = new mongoose_1.default.Schema({
    userID: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: `User`
    },
    pictures: [
        {
            fileName: { type: String, required: true },
            plantInfo: plantInfoSchema
        }
    ]
});
exports.default = mongoose_1.default.model(`History`, historySchema, `history`);
