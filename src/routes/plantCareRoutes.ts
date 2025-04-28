import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as plantCareController from '../controllers/plantCareController';

const router = express.Router();

router.get("/user/plants", verifyToken, plantCareController.getPlantController);
router.post("/user/plant", verifyToken, plantCareController.createPlantCareController);
router.put("/user/plant/:id", verifyToken, plantCareController.updatePlantCareController);
router.delete("/user/plant/:id", verifyToken, plantCareController.deletePlantCareController);

export default router;