import { Request, Response } from "express";
import * as plantCareService from '../services/plantCareService'
import * as plantCareSchema from '../schemas/plantCareSchema';

export const getPlantController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        const response = await plantCareService.getPlantService(userPayload._id);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const createPlantController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        await plantCareSchema.createPlantSchema.validate(req.body)
        const response = await plantCareService.createPlantService(userPayload._id, req.body);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const updatePlantController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        await plantCareSchema.updatePlantSchema.validate(req.body)
        const response = await plantCareService.updatePlantService(userPayload._id, req.params.id, req.body);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const deletePlantController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        const response = await plantCareService.deletePlantService(userPayload._id, req.params.id);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}