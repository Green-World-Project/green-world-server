import { Request, Response } from "express";
import * as plantsService from '../services/plantsService'

export const getPlantController = async (req: Request, res: Response) => {
    const response = await plantsService.getPlantsService();
    res.status(200).json(response);
};