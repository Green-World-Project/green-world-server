import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as userPlantsController from '../controllers/userPlantsController';

const router = express.Router();

router.get("/user/plants", verifyToken, userPlantsController.getPlantController);
router.post("/user/plant", verifyToken, userPlantsController.addPlantController);
router.put("/user/plant/:id", verifyToken, userPlantsController.updatePlantController);
router.delete("/user/plant/:id", verifyToken, userPlantsController.deletePlantController);

export default router;