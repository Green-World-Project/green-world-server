import express from 'express'
import * as userController from '../controllers/userController'

const router = express.Router();

router.get("/user/me", userController.getUser);
router.post("/register", userController.signup);
router.get("/login", userController.login);
router.put("/user/edit", userController.updateUser);

export default router;