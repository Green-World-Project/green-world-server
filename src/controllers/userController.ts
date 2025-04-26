import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as userSchema from '../schemas/userSchema';

export const getUserController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        const user = await userService.getUserService(userPayload._id);
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


export const updateUserController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        await userSchema.updateUserSchema.validate(req.body);
        const user = await userService.updateUserService(userPayload._id, req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    }
}