import UserModel, { User } from '../models/user';
import { addToHistoryService } from '../services/historyService';


export const plantIdentService = async (payload: User, body: any) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        addToHistoryService(checkUser, body);
        return "Added successfully";
    } else throw new Error("Unuthorized");
}


