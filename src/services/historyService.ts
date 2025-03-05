import UserModel, { User } from '../models/user';
import historyModel, { History } from '../models/history';
import { mapplantIdentList } from '../utils/plantIdent'
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

export const getHistoryService = async (payload: User) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await historyModel.find({ userID: checkUser._id });
        if (result) return mapplantIdentList(result);
        else throw new Error("History not Found");
    } throw new Error("Unauthorized");
};

export const addToHistoryService = async (user: any, body: any, info: any) => {
    const result = await historyModel.create({
        userID: user._id,
        fileName: body.originalname,
        info: {
            name: info.name,
            condition: info.condition
        }
    });
    if (!result) throw new Error("History not added");
    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "history",
                public_id: path.basename(result.fileName, path.extname(body.originalname)),
                resource_type: "image"
            }
        )
        uploadStream.end(body.buffer);
    } catch (error) {
        throw new Error("Upload Error:" + error);
    };
};