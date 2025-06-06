import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as historyController from '../controllers/historyController';

const router = express.Router();

router.get("/user/history", verifyToken, historyController.getHistoryController);
router.delete("/user/history/:id", verifyToken, historyController.deleteHistoryController);

export default router;