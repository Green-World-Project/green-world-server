import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as userSchema from '../schemas/userSchema';
import { User } from '../models/user';

export const getUserController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const user = await userService.getUserService(payload);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const registerController = async (req: Request, res: Response) => {
    try {
        await userSchema.signupSchema.validate(req.body);
        const user = await userService.registerService(req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    }
}

export const loginController = async (req: Request, res: Response) => {
    try {
        await userSchema.loginSchema.validate(req.body);
        const user = await userService.loginService(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}


export const updateUserInfoController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await userSchema.updateUserInfoSchema.validate(req.body);
        const user = await userService.updateUserInfoService(payload, req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    }
}


export const updateUserPasswordController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await userSchema.updateUserPasswordSchema.validate(req.body);
        const user = await userService.updateUserPasswordService(payload, req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    }
}