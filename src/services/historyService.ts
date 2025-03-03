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
    } throw new Error("Unuthorized");
}


export const addToHistoryService = async (user: any, body: any) => {
    const result = await historyModel.create({
        userID: user._id,
        fileName: body.originalname,
        info: {
            name: "body.info.name",
            condition: "body.info.condition"
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
        );
        uploadStream.end(body.buffer);
    } catch (error) {
        console.error("Upload Error:", error);
    }
}