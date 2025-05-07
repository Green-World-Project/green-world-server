import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { Types } from "mongoose";
import { BadRequestError } from '../utils/ApiError';

export interface UserPayload {
    _id: Types.ObjectId;
    email: String;
}

export const generateTokenService = (userPayload: UserPayload) => {
    if (!process.env.ACCESS_TOKEN_SECRET) throw new BadRequestError("Signature is not defined");
    const token = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
    return { token };
}