import express from 'express'
import * as userController from '../controllers/userController'

const router = express.Router();

router.get("/user/:username", userController.getUser);
router.get("/user/login", userController.login);
router.post("/user/signup", userController.signup);
router.put("/user/:username/edit", userController.updateUser);

export default router;