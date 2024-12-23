"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// mongoose.connect('mongodb+srv://vercel-admin-user-676834cadc6de46ef028bac1:kfzmCWFGbyb0tZRQ@cluster0.bdm0t.mongodb.net/greenWorldDatabase?retryWrites=true&w=majority');
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb+srv://vercel-admin-user-676834cadc6de46ef028bac1:kfzmCWFGbyb0tZRQ@cluster0.bdm0t.mongodb.net/greenWorldDatabase?retryWrites=true&w=majority');
const db = mongoose_1.default.connection;
db.on("error", () => console.log("Connection Error!"));
db.once("open", () => console.log("Connected to mongoDB..."));
app.use(userRoutes_1.default);
app.get('/vercel', (req, res) => {
    res.json({ message: "Server is running on vercel" });
});
app.listen(port, () => console.log(`Server is running on port ${port}...`));
