"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.createUser = exports.loginUser = exports.gerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const AES_1 = require("../lib/AES");
const secretKey = "my-strong-secret-key"; // A user-defined secret key
const aes = new AES_1.AES(secretKey);
const gerUser = (params, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({ username: params.username, _id: id }, { __v: false });
    return user;
});
exports.gerUser = gerUser;
const loginUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const user = yield user_1.default.find({ email: email, password: password }, { __v: false });
    return user;
});
exports.loginUser = loginUser;
const createUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.create(body);
    return user;
});
exports.createUser = createUser;
const updateUser = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.updateOne({ username: params.username, _id: body._id }, { $set: body });
    return user;
});
exports.updateUser = updateUser;
