import { Request, Response } from "express";
import * as plantIdentService from '../services/plantIdentService';
import { asyncHandler } from '../utils/asyncHandler';

export const plantIdentController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else if (!req.file) res.status(400).json({ error: "Photo data is required" });
    else {
        const response = await plantIdentService.plantIdentService(userPayload._id, req.file);
        res.status(200).json(response);
    };
});