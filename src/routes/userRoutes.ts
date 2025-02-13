import express from 'express'
import * as userController from '../controllers/userController'

const router = express.Router();

router.get("/user", userController.getUser);
router.post("/register", userController.register);
router.get("/login", userController.login);
router.put("/user/edit", userController.updateUser);

export default router;
