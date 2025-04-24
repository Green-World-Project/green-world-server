import UserModel, { User } from '../models/user';
import { addHistoryService, multerFile } from '../services/historyService';
import axios from 'axios';
import FormData from 'form-data';

export let statusCode: number;

export const plantIdentService = async (payload: User, file: multerFile) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, file.originalname);
            const response = await axios.post(`${process.env.PLANT_IDENTIFICATION_SESSION}/predict`, formData, {
                headers: { ...formData.getHeaders() }
            });
            addHistoryService(checkUser, file, response.data);
            statusCode = 201;
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 422) {
                statusCode = 422;
                throw new Error("Unable to identify please send a photo of a plant")
            } else {
                statusCode = 500;
                throw new Error("Plant identification failed");
            }
        }
    } else throw new Error("Unauthorized");
};