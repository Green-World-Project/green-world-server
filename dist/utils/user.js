"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserList = void 0;
const userObject = (user) => ({
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
const mapUserList = (userList) => {
    return userList.map((user) => userObject(user));
};
exports.mapUserList = mapUserList;
