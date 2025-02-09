import * as Yup from 'yup';

export const getUser = Yup.object({
    _id: Yup.string().required()
})

export const login = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required()
})

export const signup = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string().email().required(),
    phoneNumber: Yup.string().required(),
    age: Yup.number().min(16).max(100),
    gender: Yup.string(),
    password: Yup.string().required()
})

export const updateUser = Yup.object({
    _id: Yup.string().required(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    email: Yup.string().email(),
    phoneNumber: Yup.string(),
    age: Yup.number().min(16).max(100),
    gender: Yup.string(),
    password: Yup.string()
})