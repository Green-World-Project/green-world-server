import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as plantsController from '../controllers/plantsController';

const router = express.Router();

router.get("/api/plants/options", verifyToken, plantsController.getPlantController);

export default router;