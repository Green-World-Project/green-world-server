"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.signup = exports.login = exports.getUser = void 0;
const Yup = __importStar(require("yup"));
exports.getUser = Yup.object({
// _id: Yup.string().required()
});
exports.login = Yup.object({
    email: Yup.string().email().required(),
    // password: Yup.string().required()
});
exports.signup = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string().required(),
    age: Yup.number().min(16).max(100),
    gender: Yup.string(),
    password: Yup.string().required()
});
exports.updateUser = Yup.object({
    _id: Yup.string().required(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    username: Yup.string(),
    email: Yup.string().email(),
    phoneNumber: Yup.string(),
    age: Yup.number().min(16).max(100),
    gender: Yup.string(),
    password: Yup.string()
});
