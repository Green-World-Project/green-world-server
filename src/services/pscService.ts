import UserModel, { User } from '../models/user';
import PCSModel, { PCS } from '../models/pcs';

export const getPlantService = async (payload: User) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        return await PCSModel.find({ userID: checkUser._id });
    } else throw new Error("Unuthorized");
}

export const addPlantService = async (payload: User, body: PCS) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.create({
            userID: checkUser._id,
            plantName: body.plantName,
            wateringTime: body.wateringTime,
            watering: body.watering
        });
        if (!result) throw new Error("Plant not Found Care System");
        return "Added successfully";
    } else throw new Error("Unuthorized");
}

export const updatePlantService = async (payload: User, id: String, body: PCS) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.findByIdAndUpdate(id, body);
        if (!result) throw new Error("Plant not Found Care System");
        return "Updated successfully";
    } else throw new Error("Unuthorized");
}

export const deletePlantService = async (payload: User, id: String) => {
    const { _id } = payload;
    const checkUser = await UserModel.findById(_id);
    if (checkUser) {
        const result = await PCSModel.findByIdAndDelete(id);
        if (!result) throw new Error("Plant not Found Care System");
        return "Deleted successfully";
    } else throw new Error("Unuthorized");
}

const PCSTimer = async () => {
    const plants = await PCSModel.find({});
    plants.forEach(plant => {
        const wateringTime = (plant.wateringTime ?? 0) * 24 * 60 * 60 * 1000;
        // const wateringTime = (plant.wateringTime ?? 0) * 60 * 1000;
        setInterval(async () => {
            await PCSModel.updateOne(
                { _id: plant._id },
                { $set: { watering: false } }
            );
        }, wateringTime);
    }); plants
}

PCSTimer();