import 'dotenv/config'
import { UserPayload } from '../services/authService';
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userPayload?: UserPayload;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("Signature is not defined");
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) throw res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, userPayload) => {
        if (error) return res.sendStatus(401);
        req.userPayload = userPayload as UserPayload;
        next();
    });
}