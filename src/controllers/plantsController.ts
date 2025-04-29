import { Request, Response } from "express";
import * as plantsService from '../services/plantsService'

export const getPlantController = async (req: Request, res: Response) => {
    try {
        const response = await plantsService.getPlantsService();
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
};