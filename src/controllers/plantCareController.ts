import { Request, Response } from "express";
import * as plantCareService from '../services/plantCareService'
import * as plantCareSchema from '../schemas/plantCareSchema';

export const getPlantCareController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        const response = await plantCareService.getPlantCareService(userPayload._id);
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
};

export const createPlantCareController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        await plantCareSchema.createPlantCareSchema.validate(req.body);
        const response = await plantCareService.createPlantCareService(userPayload._id, req.body);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
};

export const updatePlantCareController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        await plantCareSchema.updatePlantCareSchema.validate(req.body);
        const response = await plantCareService.updatePlantCareService(userPayload._id, req.params.id, req.body);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
};

export const deletePlantCareController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else try {
        const response = await plantCareService.deletePlantCareService(userPayload._id, req.params.id);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
};