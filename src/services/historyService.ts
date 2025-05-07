import UserModel from '../models/user';
import historyModel, { History } from '../models/history';
import { mapHistoryList } from '../utils/history'
import { Types } from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { BadRequestError, InternalServerError, NotFoundError, UnauthorizedError } from '../utils/ApiError';

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

export const getHistoryService = async (userID: Types.ObjectId) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await historyModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
        if (result && result.length > 0) return mapHistoryList(result as History[]);
        else throw new NotFoundError("History not Found");
    } throw new UnauthorizedError("Unauthorized");
};

export const addHistoryService = async (userID: Types.ObjectId, file: multerFile, info: info) => {
    const result = await historyModel.create({
        userID: userID._id,
        fileName: file.originalname,
        info: {
            name: info.name,
            condition: info.condition
        }
    });
    if (!result) throw new BadRequestError("Photo not added in history");
    const publicID = path.basename(result.fileName, path.extname(file.originalname));
    try {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "history",
                public_id: publicID,
                resource_type: "image"
            }
        )
        uploadStream.end(file.buffer);
    } catch (error) {
        throw new BadRequestError('Upload Error');
    };
};

export const deleteHistoryService = async (userID: Types.ObjectId, id: String) => {
    const checkUser = await UserModel.findById(userID);
    if (!checkUser) throw new UnauthorizedError("Unauthorized");
    const result = await historyModel.findByIdAndDelete(id);
    if (!result) throw new InternalServerError("Photo not found in history");
    const publicID = path.basename(result.fileName, path.extname(result.fileName));
    try {
        await cloudinary.uploader.destroy(`history/${publicID}`);
        return "Deleted successfully";
    } catch (error) {
        throw new BadRequestError('Error deleting file');
    }
};