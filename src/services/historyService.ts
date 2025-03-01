import UserModel, { User } from '../models/user';
import historyModel, { History } from '../models/history';

export const getHistoryService = async (payload: User) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        return await historyModel.find({ userID: checkUser._id });
    } throw new Error("History not Found");
}

export const createHistoryService = async (payload: User, body: History) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await historyModel.create({
            userID: checkUser._id,
            fileName: body.fileName,
            info: {
                name: body.info.name,
                condition: body.info.condition
            }
        });
        if (!result) throw new Error("History not Found");
        return "Added successfully";
    } else throw new Error("Unuthorized");
}