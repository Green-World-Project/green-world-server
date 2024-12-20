import express from 'express';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect(`mongodb://localhost:27017/greenWorld`);

const db = mongoose.connection;

db.on("error", () => console.log("Connection Error!"));
db.once("open", () => console.log("Connected to mongoDB..."));

app.use(userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));