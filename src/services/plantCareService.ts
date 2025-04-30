import UserModel from '../models/user';
import plantCareModel, { PlantCare } from '../models/plantCare';
import { mapPlantCareList } from '../utils/plantCare';
import { getPlants, Plant } from './plantsService';
import { Types } from "mongoose";

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

export const updatePlantCareService = async (userID: Types.ObjectId, id: String, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    if (checkUser) {
        const result = await plantCareModel.findOneAndUpdate({ _id: id }, body);
        if (!result) throw new Error("Plant not found in care system");
        return "Updated successfully";
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


/*
   Hi {name},
   Your {plant_name} could really use a little water right now!  
   A quick sprinkle and it'll be good to go.
   
   Thanks for keeping your plants happy!  
   - green world
*/