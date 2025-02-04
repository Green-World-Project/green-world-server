import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectToDatabase } from './config/mongodb';
import userRoutes from "./routes/userRoutes";

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());

connectToDatabase();

app.get('/', (req: Request, res: Response) => {
    res.json({ message: `Server is running on port ${port}...` })
});

app.use(userRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
