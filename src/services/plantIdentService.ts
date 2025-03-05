import UserModel, { User } from '../models/user';
import { addToHistoryService } from '../services/historyService';
import axios from 'axios';
import FormData from 'form-data';

export const plantIdentService = async (payload: User, body: any) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const plantIdent = async () => {
            try {
                const formData = new FormData();
                formData.append('file', body.buffer, body.originalname);
                const response = await axios.post(`${process.env.PLANT_IDENTIFICATION_SESSION}/predict`, formData, {
                    headers: {
                        ...formData.getHeaders()
                    }
                });
                return response.data;
            } catch (error) {
                console.error(error);
                throw new Error("Plant identification failed");
            }
        }
        const plantIdentResult = await plantIdent();
        addToHistoryService(checkUser, body, plantIdentResult);
        return plantIdentResult;
    } else {
        throw new Error("Unauthorized");
    }
}