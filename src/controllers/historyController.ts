import { Request, Response } from "express";
import * as historyService from '../services/historyService';
import * as historySchema from '../schemas/historySchema';
import { User } from '../models/user';

export const getHistoryController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await historyService.getHistoryService(payload);
        res.status(201).json(response)
    }
    catch (error) {
        if (error instanceof Error) res.status(500).json({ error: error.message })
    }
}

export const createHistoryController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        await historySchema.historySchema.validate(req.body)
        const response = await historyService.createHistoryService(payload, req.body);
        res.status(201).json(response)
    }
    catch (error) {
        if (error instanceof Error) res.status(500).json({ error: error.message })
    }
}