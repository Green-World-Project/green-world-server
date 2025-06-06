import { User } from '../models/user';

export const userObject = (user: User) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        age: user.age,
        gender: user.gender,
    }
};