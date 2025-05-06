import bcrypt from 'bcrypt';
import UserModel, { User } from '../models/user';
import { userObject } from '../utils/user';
import { generateTokenService } from './authService'
import { Types } from "mongoose";
import { BadRequestError, ConflictError, UnauthorizedError, ValidationError, InternalServerError, NotFoundError } from '../utils/ApiError';

const saltRounds = 10;

interface ChangePassword {
    currentPassword: string,
    newPassword: string
};

export const getUserService = async (userID: Types.ObjectId) => {
    const user = await UserModel.findById(userID);
    if (user) return userObject(user);
    else throw new UnauthorizedError('Unauthorized');
};

export const registerService = async (user: User) => {
    const { email, phoneNumber, password }: any = user;
    const checkUser = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (checkUser) {
        let existsMessage: User = {};
        if (email === checkUser.email) existsMessage.email = 'Email already exists';
        if (phoneNumber === checkUser.phoneNumber) existsMessage.phoneNumber = 'Phone number already exists';
        throw new ConflictError(Object.values(existsMessage).join(' & '));
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        const result = await UserModel.create(user);
        const userPayload = {
            _id: result._id,
            email: result.email
        }
        if (result) return generateTokenService(userPayload);
    } catch (error) {
        throw new InternalServerError('Error hashing pasword');
    }
};

export const loginService = async (user: User) => {
    const { email, password }: any = user;
    const checkUser = await UserModel.findOne({ email });
    if (!checkUser) throw new UnauthorizedError('Invalid email or password');
    const result = await bcrypt.compare(password, checkUser.password);
    const userPayload = {
        _id: checkUser._id,
        email: checkUser.email
    };
    if (result) return generateTokenService(userPayload);
    else throw new UnauthorizedError('Invalid email or password');
};

export const updateUserInfoService = async (userID: Types.ObjectId, body: User) => {
    if (body.password) throw new BadRequestError("Invalid field in update info");
    const user = await UserModel.findByIdAndUpdate(userID, body, { new: true });
    if (!user) throw new UnauthorizedError('Unauthorized');
    else return { message: 'Updated successfully' };
};

export const updateUserPasswordService = async (userID: Types.ObjectId, body: ChangePassword) => {
    const user = await UserModel.findById(userID);
    if (!user) throw new UnauthorizedError('Unauthorized');
    const isMatch = await bcrypt.compare(body.currentPassword, user.password);
    if (!isMatch) throw new ValidationError('Wrong current password');
    const hashedPassword = await bcrypt.hash(body.newPassword, saltRounds);
    const result = await UserModel.updateOne({ _id: userID }, { $set: { password: hashedPassword } });
    if (result.modifiedCount > 0) return { message: 'Password updated successfully' };
    else throw new InternalServerError('Error updating password');
};