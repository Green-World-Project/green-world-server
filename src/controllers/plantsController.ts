import { Request, Response } from "express";
import * as plantsService from '../services/plantsService';
import { asyncHandler } from '../utils/asyncHandler';

export const getPlantController = asyncHandler(async (req: Request, res: Response) => {
    const response = await plantsService.getPlantsService();
    res.status(200).json(response);
});