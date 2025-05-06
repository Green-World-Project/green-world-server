import { Request, Response } from "express";
import * as plantIdentService from '../services/plantIdentService';

export const plantIdentController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else if (!req.file) res.status(400).json({ error: "Photo data is required" });
    else try {
        const response = await plantIdentService.plantIdentService(userPayload._id, req.file);
        res.status(200).json(response)
    }
    catch (error) {
        if (error instanceof Error)
            res.status(400).json({ error: error.message })
    };
};