import UserModel, { User } from '../models/user';
import userPlantsModel, { UserPlant } from '../models/userPlants';
import { mapPlantsList } from '../utils/userPlants';
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

const getPlant = async (plantID: Types.ObjectId) => {
    const database = getDatabase();
    if (!database) throw new Error("Database connection is undefined");
    const collection = database.collection('plants');
    return await collection.findOne({ _id: new Types.ObjectId(plantID) });
}

export const getPlantService = async (userID: Types.ObjectId) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result: any = await userPlantsModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
        if (result && result.length > 0) return mapPlantsList(result);
    } else throw new Error("Unauthorized");
}

export const addPlantService = async (userID: Types.ObjectId, body: UserPlant) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const plantID = body.plantID;
        const plant = await getPlant(plantID);
        if (!plant) throw new Error("Plant not Added");
        const result = await userPlantsModel.create({
            userID: userID,
            plantID: plantID,
            waterNeed: body.groundArea * plant.daily_water_requirement_liters_per_m2,
            groundArea: body.groundArea

        });
        if (!result) throw new Error("Plant not added in care system");
        return "Added successfully";
    } else throw new Error("Unauthorized");
}

export const updatePlantService = async (userID: Types.ObjectId, id: String, plant: UserPlant) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await userPlantsModel.findByIdAndUpdate(id, plant);
        if (!result) throw new Error("Plant not found in care system");
        return "Updated successfully";
    } else throw new Error("Unauthorized");
}

export const deletePlantService = async (userID: Types.ObjectId, id: String) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await userPlantsModel.findByIdAndDelete(id);
        if (!result) throw new Error("Plant not found in care system");
        return "Deleted successfully";
    } else throw new Error("Unauthorized");
}

// const PCSTimer = async () => {
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

// PCSTimer();