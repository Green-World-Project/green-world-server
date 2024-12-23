"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const documentationController_1 = require("../controllers/documentationController");
const router = express_1.default.Router();
router.get("/green-world-api/documentation", documentationController_1.getDocumentation);
exports.default = router;
