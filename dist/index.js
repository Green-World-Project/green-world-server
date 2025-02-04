"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("./config/mongodb");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT;
app.use(express_1.default.json());
(0, mongodb_1.connectToDatabase)();
app.get('/', (req, res) => {
    res.json({ message: `Server is running on port ${port}...` });
});
app.use(userRoutes_1.default);
app.listen(port, () => console.log(`Server is running on port ${port}...`));
