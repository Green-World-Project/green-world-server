"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentationService = void 0;
const path_1 = __importDefault(require("path"));
const documentationService = () => {
    const documentation = path_1.default.join(`${__dirname}/../../view`, 'documentation.html');
    return documentation;
};
exports.documentationService = documentationService;
