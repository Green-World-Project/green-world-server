import express from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/mongodb';
import userRoutes from "./routes/userRoutes";
import cors from 'cors';


const app = express();
dotenv.config();
app.use(cors());
const port = process.env.PORT;

app.use(express.json());

connectToDatabase();

app.use(userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
