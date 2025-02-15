import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as userController from '../controllers/userController';

const router = express.Router();

router.get("/user", verifyToken, userController.getUser);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/user/edit", verifyToken, userController.updateUser);

export default router;
