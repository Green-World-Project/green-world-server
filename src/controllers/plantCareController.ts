import { Request, Response } from "express";
import * as plantCareService from '../services/plantCareService'
import * as plantCareSchema from '../schemas/plantCareSchema';
import { asyncHandler } from '../utils/asyncHandler';
import { BadRequestError } from '../utils/ApiError';

export const getPlantCareController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    const response = await plantCareService.getPlantCareService(userPayload._id);
    res.status(200).json(response);
});

export const createPlantCareController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    await plantCareSchema.createPlantCareSchema.validate(req.body);
    const response = await plantCareService.createPlantCareService(userPayload._id, req.body);
    res.status(201).json(response);
});

export const updatePlantCareController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    await plantCareSchema.updatePlantCareSchema.validate(req.body);
    const response = await plantCareService.updatePlantCareService(userPayload._id, req.params.id, req.body);
    res.status(200).json(response);
});

export const deletePlantCareController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) throw new BadRequestError("User payload is missing");
    const response = await plantCareService.deletePlantCareService(userPayload._id, req.params.id);
    res.status(200).json(response);
});