import express, { Request, Response } from 'express';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(express.json());

// mongoose.connect('mongodb+srv://vercel-admin-user-676834cadc6de46ef028bac1:kfzmCWFGbyb0tZRQ@cluster0.bdm0t.mongodb.net/greenWorldDatabase?retryWrites=true&w=majority');

mongoose.connect(process.env.MONGODB_URI || '');

app.use(userRoutes);

app.get('/vercel', (req: Request, res: Response) => {
    res.json({ message: "Server is running on port" })
})

app.listen(port, () => console.log(`Server is running on port ${port}...`));