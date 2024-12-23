import express from 'express';
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import documentationRoutes from './routes/documentationRoutes';

const app = express();
const port = 3000;

app.use(express.json());

// mongoose.connect(`mongodb+srv://vercel-admin-user-676834cadc6de46ef028bac1:kfzmCWFGbyb0tZRQ@cluster0.bdm0t.mongodb.net/greenWorldDatabase`);

mongoose.connect(process.env.MONGODB_URI || '');

app.use(userRoutes);
app.use(documentationRoutes)

app.listen(port, () => console.log(`Server is running on port ${port}...`));