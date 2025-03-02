import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as plantIdentController from '../controllers/plantIdentController';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, limits: { fileSize: 500 * 1024 * 1024 } // 10MB limit, adjust as needed
});

router.post("/user/plant-identification", verifyToken, upload.single('photo'), plantIdentController.plantIdentController);

export default router;