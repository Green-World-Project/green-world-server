import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as userSchema from '../schemas/userSchema';

export const getUser = async (req: Request, res: Response) => {
    try {
        await userSchema.getUser.validate(req.body);
        const user = await userService.getUserService(req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const register = async (req: Request, res: Response) => {
    try {
        await userSchema.signup.validate(req.body);
        const user = await userService.registerService(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        await userSchema.login.validate(req.body);
        const user = await userService.loginService(req.body);
        res.status(201).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}


export const updateUser = async (req: Request, res: Response) => {
    try {
        await userSchema.updateUser.validate(req.body);
        const user = await userService.updateUserService(req.body);
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    }
}