"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapUserList = exports.userObject = void 0;
const userObject = (user) => ({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    age: user.age,
    gender: user.gender,
});
exports.userObject = userObject;
const mapUserList = (userList) => {
    return userList.map((user) => (0, exports.userObject)(user));
};
exports.mapUserList = mapUserList;
