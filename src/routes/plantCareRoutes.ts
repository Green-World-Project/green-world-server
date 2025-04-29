import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as plantCareController from '../controllers/plantCareController';

const router = express.Router();

router.get("/user/plant-care", verifyToken, plantCareController.getPlantCareController);
router.post("/user/plant-care", verifyToken, plantCareController.createPlantCareController);
router.put("/user/plant-care/:id", verifyToken, plantCareController.updatePlantCareController);
router.delete("/user/plant-care/:id", verifyToken, plantCareController.deletePlantCareController);

export default router;