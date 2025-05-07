import { Request, Response } from "express";
import * as plantIdentService from '../services/plantIdentService';
import { asyncHandler } from '../utils/asyncHandler';
import { BadRequestError } from '../utils/ApiError';

export const plantIdentController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    else if (!req.file) throw new BadRequestError("Photo data is required");
    const response = await plantIdentService.plantIdentService(userPayload._id, req.file);
    res.status(200).json(response);
});