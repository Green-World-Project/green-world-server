"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentation = void 0;
const documentationService_1 = require("../services/documentationService");
const getDocumentation = (req, res) => {
    try {
        res.status(200).sendFile((0, documentationService_1.documentationService)());
    }
    catch (error) {
        if (error instanceof Error)
            res.status(404).json({ message: error });
    }
};
exports.getDocumentation = getDocumentation;
