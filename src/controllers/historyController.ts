import { Request, Response } from "express";
import * as historyService from '../services/historyService';
import { User } from '../models/user';

export const getHistoryController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await historyService.getHistoryService(payload);
        res.status(201).json(response);
    }
    catch (error) {
        if (error instanceof Error) res.status(500).json({ error: error.message });
    }
};

export const deleteHistoryController = async (req: Request, res: Response) => {
    const payload = req.user as User;
    try {
        const response = await historyService.deleteHistoryService(payload, req.params.id);
        res.status(201).json(response);
    } catch (error) {
        if (error instanceof Error)
            res.status(500).json({ error: error.message });
    }
};