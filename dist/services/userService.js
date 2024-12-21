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
exports.updateUserService = exports.signupService = exports.loginService = exports.getUserService = void 0;
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("../utils/user");
const AES_1 = require("../lib/AES");
const secretKey = "my-strong-secret-key"; // A user-defined secret key
const aes = new AES_1.AES(secretKey);
const getUserService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({
        username: params.username,
        _id: body._id
    });
    return (0, user_2.mapUserList)(user);
});
exports.getUserService = getUserService;
const loginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({
        email: body.email
        // password: body.password
    });
    return (0, user_2.mapUserList)(user);
});
exports.loginService = loginService;
const signupService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.create(body);
    return user;
});
exports.signupService = signupService;
const updateUserService = (params, body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.updateOne({
        username: params.username,
        _id: body._id
    }, { $set: body });
    return user;
});
exports.updateUserService = updateUserService;
