"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const picturesSchema = new mongoose_1.default.Schema({
    pictures: [
        {
            fileName: { type: String, required: true },
            info: {
                name: { String, required: true },
                condition: { String, required: true }
            }
        }
    ]
});
const historySchema = new mongoose_1.default.Schema({
    userID: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "User"
    },
    pictures: picturesSchema
});
historySchema.pre("save", function (next) {
    var _a;
    if (this.isNew) { // Only generate and prepend for new documents
        (_a = this.pictures) === null || _a === void 0 ? void 0 : _a.pictures.forEach((picture) => {
            picture.fileName = `${new mongoose_1.default.Types.ObjectId()}_${picture.fileName}`;
        });
    }
    next();
});
exports.default = mongoose_1.default.model(`History`, historySchema, `history`);
