import bcrypt from 'bcrypt';
import UserModel, { User } from '../models/user';
import { userObject } from '../utils/user'
import { generateTokenService } from './authService'

const saltRounds = 10;

export const getUserService = async (payload: User) => {
    const { _id }: any = payload;
    const user = await UserModel.findById(_id);
    if (user) return userObject(user);
    else throw new Error('Unuthorized');
}

export const registerService = async (body: User) => {
    const { email, phoneNumber, password }: any = body;
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
        body.password = hashedPassword;
        const result = await UserModel.create(body);
        const payload = {
            _id: result._id,
            email: result.email
        }
        if (result) return generateTokenService(payload);
    } catch (error) {
        return { message: 'Error hashing pasword:', error };
    }
}

export const loginService = async (body: User) => {
    const { email, password }: any = body;
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

export const updateUserService = async (payload: User, body: User) => {
    const { _id }: any = payload;
    const { password }: any = body;
    if (body.password) {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            body.password = hashedPassword;
            const user = await UserModel.findByIdAndUpdate(_id, body, { new: true });
            if (user) return { message: 'Updated successfully' };
        } catch (error) {
            return { message: 'Error hashing pasword:', error };
        }
    }
    const user = await UserModel.findByIdAndUpdate(_id, body, { new: true });
    if (user) return { message: 'Updated successfully' };
}
