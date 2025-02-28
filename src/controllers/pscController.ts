import { Request, Response } from "express";
import * as pscService from '../services/pscService'
import * as pcsSchema from '../schemas/pcsSchema';
import { User } from '../models/user';

export const getPlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await pscService.getPlantService(payload);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const addPlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await pcsSchema.addPlantSchema.validate(req.body)
        const response = await pscService.addPlantService(payload, req.body);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const updatePlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await pcsSchema.updatePlantSchema.validate(req.body)
        const response = await pscService.updatePlantService(payload, req.params.id, req.body);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const deletePlantController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await pscService.deletePlantService(payload, req.params.id);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}