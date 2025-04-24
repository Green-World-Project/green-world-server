import { Request, Response } from "express";
import * as userPlantsService from '../services/userPlantsService'
import * as userPlantsSchema from '../schemas/userPlantsSchema';
import { User } from '../models/user';

export const getPlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await userPlantsService.getPlantService(payload);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const addPlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await userPlantsSchema.addPlantSchema.validate(req.body)
        const response = await userPlantsService.addPlantService(payload, req.body);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const updatePlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await userPlantsSchema.updatePlantSchema.validate(req.body)
        const response = await userPlantsService.updatePlantService(payload, req.params.id, req.body);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const deletePlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await userPlantsService.deletePlantService(payload, req.params.id);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}