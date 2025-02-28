import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as pscController from '../controllers/pscController';

const router = express.Router();

router.get("/user/pcs", verifyToken, pscController.getPlantController);
router.post("/user/pcs", verifyToken, pscController.addPlantController);
router.put("/user/pcs/:id", verifyToken, pscController.updatePlantController);
router.delete("/user/pcs/:id", verifyToken, pscController.deletePlantController);

export default router;