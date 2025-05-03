import UserModel from '../models/user';
import plantCareModel, { PlantCare } from '../models/plantCare';
import { plantCareObject, mapPlantCareList } from '../utils/plantCare';
import { getPlants, Plant } from './plantsService';
import { Types } from "mongoose";
import { sendEmail } from '../utils/email';

export const getPlantCareService = async (userID: Types.ObjectId) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await plantCareModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
        const plants = await getPlants() as Plant[];
        if (result && result.length > 0 && Array.isArray(plants)) return mapPlantCareList(result, plants);
    } else throw new Error("Unauthorized");
};

export const createPlantCareService = async (userID: Types.ObjectId, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    const plantID = body.plantID;
    const plant = await getPlants(plantID);
    if (!plant || Array.isArray(plant)) throw new Error("Plants not found");
    if (checkUser) {
        const result = await plantCareModel.create({
            userID: userID,
            plantID: plantID,
            waterNeed: body.groundArea * plant.daily_water_requirement_liters_per_m2,
            groundArea: body.groundArea,
            isWatered: body.isWatered,
        });
        if (!result) throw new Error("Plant not added");
        return {
            message: "Added successfully",
            result: plantCareObject(result, plant as Plant),
        };
    } else throw new Error("Unauthorized");
};

export const updatePlantCareService = async (userID: Types.ObjectId, id: String, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    const plantID = body.plantID;
    const plant = await getPlants(plantID);
    if (!plant || Array.isArray(plant)) throw new Error("Plants not found");
    if (checkUser) {
        const waterNeed = body.groundArea
            ? body.groundArea * plant.daily_water_requirement_liters_per_m2
            : body.waterNeed;
        const result = await plantCareModel.findByIdAndUpdate(id, {
            plantID: plantID,
            waterNeed: waterNeed,
            groundArea: body.groundArea,
            isWatered: body.isWatered,
        });
        if (!result) throw new Error("Plant not updated");
        return {
            message: "Updated successfully",
            result: plantCareObject(result, plant as Plant),
        };
    } else throw new Error("Unauthorized");
};

export const deletePlantCareService = async (userID: Types.ObjectId, id: String) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await plantCareModel.findByIdAndDelete(id);
        if (!result) throw new Error("Plant not found in care system");
        return "Deleted successfully";
    } else throw new Error("Unauthorized");
};

const plantCareNotification = async () => {
    const plantCares = await plantCareModel.find();
    const plants = await getPlants();
    const now = Date.now();
    if (!plants || !Array.isArray(plants)) throw new Error("Plants not found");
    for (const care of plantCares) {
        const plant = (plants as Plant[]).find((plant: Plant) => plant._id.toString() === care.plantID.toString());
        if (!plant) continue;
        const nextWateringTime = new Date(care.lastWateredAt).getTime() + plant.water_duration_days * 24 * 60 * 60 * 1000;
        if (now >= nextWateringTime && care.isWatered) {
            await plantCareModel.updateOne(
                { _id: care._id },
                { $set: { isWatered: false } }
            );
            // sendEmail(checkUser.email, subject, text);
            console.log(`PlantCare ${care._id} marked as not watered.`);
        }
    }
};

plantCareNotification();