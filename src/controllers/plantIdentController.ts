import { Request, Response } from "express";
import * as plantIdentService from '../services/plantIdentService';
import { User } from '../models/user';

export const plantIdentController = async (req: Request, res: Response): Promise<void> => {
    const payload = req.user as User;
    try {
        if (!req.file?.buffer) {
            res.status(400).json({ error: "Photo data is required" });
        }
        const response = await plantIdentService.plantIdentService(payload, req.file);
        res.status(201).json(response)
    }
    catch (error) {
        if (error instanceof Error) res.status(500).json({ error: error.message })
    };
};