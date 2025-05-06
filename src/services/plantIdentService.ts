import UserModel, { User } from '../models/user';
import { addHistoryService, multerFile } from '../services/historyService';
import axios from 'axios';
import FormData from 'form-data';
import { Types } from "mongoose";
import { UnauthorizedError, ValidationError } from '../utils/ApiError';

export const plantIdentService = async (userID: Types.ObjectId, file: multerFile) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, file.originalname);
            const response = await axios.post(`${process.env.PLANT_IDENTIFICATION_SESSION}/predict`, formData, {
                headers: { ...formData.getHeaders() }
            });
            addHistoryService(checkUser._id, file, response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 422) throw new ValidationError("Unable to identify please send a photo of a plant")
        }
    } else throw new UnauthorizedError("Unauthorized");
};