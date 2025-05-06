import { Request, Response } from "express";
import * as historyService from '../services/historyService';
import { asyncHandler } from '../utils/asyncHandler';

export const getHistoryController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        const response = await historyService.getHistoryService(userPayload._id);
        res.status(200).json(response);
    };
});

export const deleteHistoryController = asyncHandler(async (req: Request, res: Response) => {
    const userPayload = req.userPayload;
    if (!userPayload) res.status(400).json({ error: "User payload is missing" });
    else {
        const response = await historyService.deleteHistoryService(userPayload._id, req.params.id);
        res.status(200).json(response);
    };
});