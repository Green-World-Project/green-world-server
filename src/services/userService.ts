import bcrypt from 'bcrypt';
import UserModel, { User } from '../models/user';
import { userObject } from '../utils/user'
import { generateTokenService } from './authService'
import { Types } from "mongoose";

const saltRounds = 10;

export const getUserService = async (userID: Types.ObjectId) => {
    const user = await UserModel.findById(userID);
    if (user) return userObject(user);
    else throw new Error('Unauthorized');
}

export const registerService = async (user: User) => {
    const { email, phoneNumber, password }: any = user;
    const checkUser = await UserModel.findOne({
        $or: [
            { email },
            { phoneNumber }
        ]
    });

    if (checkUser) {
        let existsMessage: User = {};
        if (email === checkUser.email) existsMessage.email = 'Email already exists';
        if (phoneNumber === checkUser.phoneNumber) existsMessage.phoneNumber = 'Phone number already exists';
        throw new Error(Object.values(existsMessage).join(' & '));
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        const result = await UserModel.create(user);
        const payload = {
            _id: result._id,
            email: result.email
        }
        if (result) return generateTokenService(payload);
    } catch (error) {
        return { message: 'Error hashing pasword:', error };
    }
}

export const loginService = async (user: User) => {
    const { email, password }: any = user;
    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
        try {
            const result = await bcrypt.compare(password, checkUser.password);
            const payload = {
                _id: checkUser._id,
                email: checkUser.email
            }
            if (result) return generateTokenService(payload);
            else return { message: 'Invalid email or password' };
        } catch (error) {
            return { message: `Error comparing passwords:  `, error };
        }
    } else return { message: 'Invalid email or password' };
};

export const updateUserInfoService = async (userID: Types.ObjectId, body: User) => {
    if (body.password) throw new Error("Invalid field in update info");
    const user = await UserModel.findByIdAndUpdate(userID, body, { new: true });
    if (user) return { message: 'Updated successfully' };
}

export const updateUserPasswordService = async (userID: Types.ObjectId, body: User) => {
    const { password }: any = body;
    const keys = Object.keys(body)
    if (keys.length > 1 || (keys.length === 1 && !body.password)) throw new Error("Invalid field in update info");
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        body.password = hashedPassword;
        const user = await UserModel.findByIdAndUpdate(userID, body, { new: true });
        if (user) return { message: 'Updated successfully' };
    } catch (error) {
        return { message: 'Error hashing pasword:', error };
    }
}