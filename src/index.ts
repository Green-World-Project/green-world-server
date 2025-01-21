import express from 'express';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes";
import vercelRoutes from "./routes/vercelRoutes";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://vercel-admin-user-676ac99b2c734d5cce212ca9:GYll9SrpyxCVJeNC@cluster0.bdm0t.mongodb.net/greenWorldDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", (error) => console.error("Connection Error!", error));
db.once("open", () => console.log("Connected to mongoDB..."));

app.use(userRoutes);
app.use(vercelRoutes)

app.listen(port, () => console.log(`Server is running on port ${port}...`));