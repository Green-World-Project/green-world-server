import bcrypt from 'bcrypt';
import UserModel, { User } from '../models/user';
import { userObject, mapUserList } from '../utils/user'

const saltRounds = 10;

export const getUserService = async (body: User) => {
    const user = await UserModel.find({
        _id: body._id
    });
    return mapUserList(user);
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
        return existsMessage;
    }
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        body.password = hashedPassword;
        const user = await UserModel.create(body);
        return { message: 'Added successfully', user };
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
            if (result) return userObject(checkUser);
            else return { message: 'Invalid email or password' };
        } catch (error) {
            return { message: `Error comparing passwords:  `, error };
        }
    } else return { message: 'Invalid email or password' };
};

export const updateUserService = async (body: User) => {
    const { _id, password }: any = body;
    if (password) {
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            body.password = hashedPassword;
            const user = await UserModel.updateOne({
                _id
            }, { $set: body });
            return { message: 'Updated successfully', user };
        } catch (error) {
            return { message: 'Error hashing pasword:', error };
        }
    }
    const user = await UserModel.updateOne({
        _id
    }, { $set: body });
    return { message: 'Updated successfully', user };
}