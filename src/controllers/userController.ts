import { Request, Response } from "express";
import * as userService from '../services/userService';
import * as userSchema from '../schemas/userSchema';
import { asyncHandler } from '../utils/asyncHandler';
import { BadRequestError } from '../utils/ApiError';

export const getUserController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    const user = await userService.getUserService(userPayload._id);
    res.status(200).json(user);
});

export const registerController = asyncHandler(async (req: Request, res: Response) => {
    await userSchema.signupSchema.validate(req.body);
    const user = await userService.registerService(req.body);
    res.status(201).json(user);
});

export const loginController = asyncHandler(async (req: Request, res: Response) => {
    await userSchema.loginSchema.validate(req.body);
    const user = await userService.loginService(req.body);
    res.status(200).json(user);
});

export const updateUserInfoController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    await userSchema.updateUserInfoSchema.validate(req.body);
    const user = await userService.updateUserInfoService(userPayload._id, req.body);
    res.status(200).json(user);
});

export const updateUserPasswordController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    await userSchema.updateUserPasswordSchema.validate(req.body);
    const user = await userService.updateUserPasswordService(userPayload._id, req.body);
    res.status(200).json(user);
});