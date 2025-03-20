import { Request, Response } from "express";
import * as plantIdentService from '../services/plantIdentService';
import { User } from '../models/user';

export const plantIdentController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    if (!req.file) throw res.status(400).json({ error: "Photo data is required" });
    try {
        const response = await plantIdentService.plantIdentService(payload, req.file);
        res.status(plantIdentService.statusCode).json(response)
    }
    catch (error) {
        if (error instanceof Error) res.status(plantIdentService.statusCode).json({ error: error.message })
    };
};