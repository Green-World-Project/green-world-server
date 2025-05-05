import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as userSchema from '../schemas/userSchema';

export const getUserController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        const user = await userService.getUserService(userPayload._id);
        res.status(200).json(user);
    };
};

export const registerController = async (req: Request, res: Response) => {
    await userSchema.signupSchema.validate(req.body);
    const user = await userService.registerService(req.body);
    res.status(201).json(user);
};

export const loginController = async (req: Request, res: Response) => {
    await userSchema.loginSchema.validate(req.body);
    const user = await userService.loginService(req.body);
    res.status(200).json(user);
}

export const updateUserInfoController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        await userSchema.updateUserInfoSchema.validate(req.body);
        const user = await userService.updateUserInfoService(userPayload._id, req.body);
        res.status(200).json(user);
    }
}

export const updateUserPasswordController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        await userSchema.updateUserPasswordSchema.validate(req.body);
        const user = await userService.updateUserPasswordService(userPayload._id, req.body);
        res.status(200).json(user);
    }
};