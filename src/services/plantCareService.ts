import UserModel from '../models/user';
import plantCareModel, { PlantCare } from '../models/plantCare';
import { mapPlantsList } from '../utils/plantCare';
import { getDatabase } from '../config/mongodb';
import { Double, Types } from "mongoose";

export interface Plants {
    _id: Types.ObjectId,
    plant_name: string,
    ideal_soil_moisture_percentage: number,
    optimal_temperature_celsius: Double,
    light_exposure_hours: number,
    optimal_soil_ph_level: Double,
    recommended_npk_ratio: string,
    water_duration_days: number,
    daily_water_requirement_liters_per_m2: number,
    humidity_percentage: number,
    plant_description: string
};

export const getPlants = async (plantID: Types.ObjectId) => {
    const database = getDatabase();
    if (!database) throw new Error("Database connection is undefined");
    const collection = database.collection('plants');
    return await collection.findOne({ _id: new Types.ObjectId(plantID) });
};

export const getPlantService = async (userID: Types.ObjectId) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await plantCareModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
        if (result && result.length > 0) return mapPlantsList(result);
    } else throw new Error("Unauthorized");
};

export const createPlantService = async (userID: Types.ObjectId, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const plantID = body.plantID;
        const plant = await getPlants(plantID);
        if (!plant || Array.isArray(plant)) throw new Error("Plant not Added");
        const result = await plantCareModel.create({
            userID: userID,
            plantID: plantID,
            waterNeed: body.groundArea * plant.daily_water_requirement_liters_per_m2,
            groundArea: body.groundArea,
            isWatered: body.isWatered,
        });
        if (!result) throw new Error("Plant not added in care system");
        return "Added successfully";
    } else throw new Error("Unauthorized");
};

export const updatePlantService = async (userID: Types.ObjectId, id: String, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await plantCareModel.findByIdAndUpdate(id, body);
        if (!result) throw new Error("Plant not found in care system");
        return "Updated successfully";
    } else throw new Error("Unauthorized");
};

export const deletePlantService = async (userID: Types.ObjectId, id: String) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await plantCareModel.findByIdAndDelete(id);
        if (!result) throw new Error("Plant not found in care system");
        return "Deleted successfully";
    } else throw new Error("Unauthorized");
};

// const plantCareTimer = async () => {
//     const plants = await userPlantsModel.find({});
//     plants.forEach(plant => {
//         // const wateringTime = (plant.wateringTime ?? 0) * 24 * 60 * 60 * 1000;
//         const wateringTime = (plant.wateringTime ?? 0) * 60 * 1000;
//         setInterval(async () => {
//             await userPlantsModel.updateOne(
//                 { _id: plant._id },
//                 { $set: { watering: false } }
//             );
//         }, wateringTime);
//     }); plants
// }

// plantCareTimer();