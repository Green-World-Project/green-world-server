import UserModel, { User } from '../models/user';
import PCSModel, { Plant } from '../models/pcs';
import { mapPlantsList } from '../utils/pcs';

export const getPlantService = async (payload: User) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
        if (result && result.length > 0) return mapPlantsList(result as Plant[]);
    } else throw new Error("Unauthorized");
}

export const addPlantService = async (payload: User, plant: Plant) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.create({
            userID: checkUser._id,
            plantName: plant.plantName,
            liter: plant.liter,
            wateringTime: plant.wateringTime,
            watering: plant.watering
        });
        if (!result) throw new Error("Plant not added in care system");
        return "Added successfully";
    } else throw new Error("Unauthorized");
}

export const updatePlantService = async (payload: User, id: String, plant: Plant) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.findByIdAndUpdate(id, plant);
        if (!result) throw new Error("Plant not found in care system");
        return "Updated successfully";
    } else throw new Error("Unauthorized");
}

export const deletePlantService = async (payload: User, id: String) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.findByIdAndDelete(id);
        if (!result) throw new Error("Plant not found in care system");
        return "Deleted successfully";
    } else throw new Error("Unauthorized");
}

const PCSTimer = async () => {
    const plants = await PCSModel.find({});
    plants.forEach(plant => {
        // const wateringTime = (plant.wateringTime ?? 0) * 24 * 60 * 60 * 1000;
        const wateringTime = (plant.wateringTime ?? 0) * 60 * 1000;
        setInterval(async () => {
            await PCSModel.updateOne(
                { _id: plant._id },
                { $set: { watering: false } }
            );
        }, wateringTime);
    }); plants
}

PCSTimer();