import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose, { ConnectOptions } from "mongoose";
import userRoutes from "./routes/userRoutes";
import vercelRoutes from "./routes/vercelRoutes";


const app = express();
const port = 3000;

app.use(express.json());

// mongoose.connect(`mongodb://localhost:27017/greenWorld`);

mongoose.connect(process.env.MONGODB_URI || '');

app.use(vercelRoutes)
app.use(userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));