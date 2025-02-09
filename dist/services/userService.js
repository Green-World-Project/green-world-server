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
exports.updateUserService = exports.loginService = exports.registerService = exports.getUserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const user_2 = require("../utils/user");
const saltRounds = 10;
const getUserService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.find({
        _id: body._id
    });
    return (0, user_2.mapUserList)(user);
});
exports.getUserService = getUserService;
const registerService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phoneNumber, password } = body;
    const checkUser = yield user_1.default.findOne({
        $or: [
            { email },
            { phoneNumber }
        ]
    });
    if (checkUser) {
        let existsMessage = {};
        if (email === checkUser.email)
            existsMessage.email = 'Email already exists';
        if (phoneNumber === checkUser.phoneNumber)
            existsMessage.phoneNumber = 'Phone number already exists';
        return existsMessage;
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        body.password = hashedPassword;
        const user = yield user_1.default.create(body);
        return { message: 'Added successfully', user };
    }
    catch (error) {
        return { message: 'Error hashing pasword:', error };
    }
});
exports.registerService = registerService;
const loginService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = body;
    const checkUser = yield user_1.default.findOne({ email });
    if (checkUser) {
        try {
            const result = yield bcrypt_1.default.compare(password, checkUser.password);
            if (result)
                return (0, user_2.userObject)(checkUser);
            else
                return { message: 'Invalid email or password' };
        }
        catch (error) {
            return { message: `Error comparing passwords:  `, error };
        }
    }
    else
        return { message: 'Invalid email or password' };
});
exports.loginService = loginService;
const updateUserService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, password } = body;
    if (password) {
        try {
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            body.password = hashedPassword;
            const user = yield user_1.default.updateOne({
                _id
            }, { $set: body });
            return { message: 'Updated successfully', user };
        }
        catch (error) {
            return { message: 'Error hashing pasword:', error };
        }
    }
    const user = yield user_1.default.updateOne({
        _id
    }, { $set: body });
    return { message: 'Updated successfully', user };
});
exports.updateUserService = updateUserService;
