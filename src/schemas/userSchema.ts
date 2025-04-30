import * as Yup from 'yup';

export const loginSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
});

export const signupSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string().required(),
    age: Yup.number().min(16).max(100),
    gender: Yup.string(),
    password: Yup.string().required()
});

export const updateUserInfoSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),
    phoneNumber: Yup.string(),
    age: Yup.number().min(16).max(100),
    gender: Yup.string(),
});

export const updateUserPasswordSchema = Yup.object({
    currentPassword: Yup.string().required(),
    newPassword: Yup.string().required()
});