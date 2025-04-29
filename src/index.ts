import express from 'express';
import 'dotenv/config';
import { connectToDatabase } from './config/mongodb';
import userRoutes from "./routes/userRoutes";
import plantCareRoutes from "./routes/plantCareRoutes";
import plantsRoutes from "./routes/plantsRoutes";
import plantIdentRoutes from "./routes/plantIdentRoutes";
import historyRoutes from "./routes/historyRoutes";
import cors from 'cors';

const app = express();
app.use(cors());
const port = process.env.PORT;

app.use(express.json());
app.use(express.raw({ type: 'application/octet-stream' }));

connectToDatabase();

app.use(userRoutes);
app.use(plantCareRoutes);
app.use(plantsRoutes);
app.use(plantIdentRoutes);
app.use(historyRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}...`));
