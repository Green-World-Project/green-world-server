import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware'
import * as userController from '../controllers/userController';

const router = express.Router();

router.get("/user", verifyToken, userController.getUserController);
router.post("/register", userController.registerController);
router.post("/login", userController.loginController);
router.put("/user/edit/info", verifyToken, userController.updateUserInfoController);
router.put("/user/edit/password", verifyToken, userController.updateUserPasswordController);

export default router;
