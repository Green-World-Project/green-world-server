import UserModel, { User } from '../models/user';
import historyModel, { History } from '../models/history';
import { mapHistoryList } from '../utils/history'
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

interface info {
    name: string,
    condition: string
};

export interface multerFile {
    fieldname: string,
    originalname: string,
    buffer: Buffer,
    encoding: string,
    mimetype: string,
    size: number;
};

export const getHistoryService = async (payload: User) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await historyModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
        if (result && result.length > 0) return mapHistoryList(result as History[]);
        else throw new Error("History not Found");
    } throw new Error("Unauthorized");
};

export const addToHistoryService = async (user: User, file: multerFile, info: info) => {
    const result = await historyModel.create({
        userID: user._id,
        fileName: file.originalname,
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
                public_id: path.basename(result.fileName, path.extname(file.originalname)),
                resource_type: "image"
            }
        )
        uploadStream.end(file.buffer);
    } catch (error) {
        throw new Error("Upload Error:" + error);
    };
};