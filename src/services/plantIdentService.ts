import UserModel, { User } from '../models/user';
import { addToHistoryService } from '../services/historyService';
import axios from 'axios';
import FormData from 'form-data';

export const plantIdentService = async (payload: User, body: any) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        try {
            const formData = new FormData();
            formData.append('file', body.buffer, body.originalname);
            const response = await axios.post(`${process.env.PLANT_IDENTIFICATION_SESSION}/predict`, formData, {
                headers: { ...formData.getHeaders() }
            });
            addToHistoryService(checkUser, body, response.data);
            return response.data;
        } catch (error) {
            throw new Error("Plant identification failed" + error);
        }
    } else throw new Error("Unuthorized");
}