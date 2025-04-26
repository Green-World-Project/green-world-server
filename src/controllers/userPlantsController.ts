import { Request, Response } from "express";
import * as userPlantsService from '../services/userPlantsService'
import * as userPlantsSchema from '../schemas/userPlantsSchema';

export const getPlantController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        const response = await userPlantsService.getPlantService(userPayload._id);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}

export const addPlantController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        await userPlantsSchema.addPlantSchema.validate(req.body)
        const response = await userPlantsService.addPlantService(userPayload._id, req.body);
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
        await userPlantsSchema.updatePlantSchema.validate(req.body)
        const response = await userPlantsService.updatePlantService(userPayload._id, req.params.id, req.body);
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
        const response = await userPlantsService.deletePlantService(userPayload._id, req.params.id);
        res.status(201).json(response)
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message })
    }
}