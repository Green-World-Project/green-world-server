import 'dotenv/config'
import { User } from '../models/user';
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    if (!process.env.ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN_SECRET is not defined");
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) throw res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.sendStatus(401);
        req.user = user as User;
        next();
    });
}