import { Request, Response } from "express";
import * as historyService from '../services/historyService';

export const getHistoryController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        const response = await historyService.getHistoryService(userPayload._id);
        res.status(200).json(response);
    };
};

export const deleteHistoryController = async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        const response = await historyService.deleteHistoryService(userPayload._id, req.params.id);
        res.status(200).json(response);
    };
};