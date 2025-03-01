import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { User } from '../models/user';

export const generateToken = (user: User = {}) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("Signature is not defined");
    }
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
    return { token };
}