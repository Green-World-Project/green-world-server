"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Gender;
(function (Gender) {
    Gender["MALE"] = "male";
    Gender["FEMLE"] = "female";
})(Gender || (Gender = {}));
;
const userSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    age: { type: Number, default: null },
    gender: { type: Gender, default: null },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
exports.default = mongoose_1.default.model('User', userSchema, "users");
