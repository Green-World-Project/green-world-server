import { User } from '../models/user';

const userObject = (user: User) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    age: user.age,
    gender: user.gender,
    password: user.password
});

export const mapUserList = (userList: User[]) => {
    return userList.map((user) => userObject(user));
};