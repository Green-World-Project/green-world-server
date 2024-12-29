import express from 'express';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes";
import vercelRoutes from "./routes/vercelRoutes";

const app = express();
const port = 3000;

app.use(express.json());

const MONGODB_URI = 'mongodb+srv://vercel-admin-user-676ac99b2c734d5cce212ca9:GYll9SrpyxCVJeNC@cluster0.bdm0t.mongodb.net/greenWorldDatabase?retryWrites=true&w=majority';

mongoose.connect(process.env.MONGODB_URI || MONGODB_URI);

const db = mongoose.connection;

db.on("error", () => console.log("Connection Error!"));
db.once("open", () => console.log("Connected to mongoDB..."));

app.use(userRoutes);
app.use(vercelRoutes)
app.use('/api/vercel', vercelRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}...`));