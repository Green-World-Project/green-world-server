import UserModel from '../models/user';
import plantCareModel, { PlantCare } from '../models/plantCare';
import { plantCareObject, mapPlantCareList } from '../utils/plantCare';
import { getPlants, Plant } from './plantsService';
import { Types } from "mongoose";
import { sendEmail } from '../utils/email';
import { generateWaterReminderEmail } from '../utils/emailTemplates';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/ApiError';

export const getPlantCareService = async (userID: Types.ObjectId) => {
    const checkUser = await UserModel.findById(userID);
    if (!checkUser) throw new UnauthorizedError("Unauthorized");
    const result = await plantCareModel.find({ userID: checkUser._id }).sort({ createdAt: -1 });
    const plants = await getPlants() as Plant[];
    if (result && result.length > 0) return mapPlantCareList(result, plants);
    else throw new NotFoundError("Plants not found in care system");
};

export const createPlantCareService = async (userID: Types.ObjectId, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    if (!checkUser) throw new UnauthorizedError("Unauthorized");
    const plantID = body.plantID;
    const plant = await getPlants(plantID);
    if (!plant || Array.isArray(plant)) throw new NotFoundError("Chose Plant From List");
    const result = await plantCareModel.create({
        userID: userID,
        plantID: plantID,
        waterNeed: body.groundArea * plant.daily_water_requirement_liters_per_m2,
        groundArea: body.groundArea,
        isWatered: body.isWatered,
    });
    if (!result) throw new BadRequestError("Plant not added");
    return {
        message: "Added successfully",
        result: plantCareObject(result, plant as Plant),
    };
};

export const updatePlantCareService = async (userID: Types.ObjectId, id: String, body: PlantCare) => {
    const checkUser = await UserModel.findById(userID);
    if (!checkUser) throw new UnauthorizedError("Unauthorized");
    const plantID = body.plantID;
    const plant = await getPlants(plantID);
    if (!plant || Array.isArray(plant)) throw new NotFoundError("Chose Plant From List");
    const waterNeed = body.groundArea
        ? body.groundArea * plant.daily_water_requirement_liters_per_m2
        : body.waterNeed;
    const result = await plantCareModel.findByIdAndUpdate(id, {
        plantID: plantID,
        waterNeed: waterNeed,
        groundArea: body.groundArea,
        isWatered: body.isWatered,
    }, { new: true });
    if (!result) throw new BadRequestError("Plant not updated");
    return {
        message: "Updated successfully",
        result: plantCareObject(result, plant as Plant),
    };
};

export const deletePlantCareService = async (userID: Types.ObjectId, id: String) => {
    const checkUser = await UserModel.findById(userID);
    if (!checkUser) throw new UnauthorizedError("Unauthorized");
    const result = await plantCareModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundError("Plant not found in care system");
    return "Deleted successfully";
};

const plantCareTimer = async () => {
    const plantCareList = await plantCareModel.find();
    const plants = await getPlants();
    const now = Date.now();
    if (!plants || !Array.isArray(plants)) throw new NotFoundError("Plants not found");
    for (const plantCare of plantCareList) {
        const plant = (plants as Plant[]).find((plant: Plant) => plant._id.toString() === plantCare.plantID.toString());
        if (!plant) continue;
        const nextWateringTime = new Date(plantCare.lastWateredAt).getTime() + plant.water_duration_days * 24 * 60 * 60 * 1000;
        if (now >= nextWateringTime && plantCare.isWatered) {
            await plantCareModel.updateOne(
                { _id: plantCare._id },
                { $set: { isWatered: false } }
            );
            const user = await UserModel.findById(plantCare.userID);
            if (user) {
                const emailContent = generateWaterReminderEmail(plant.plant_name, user.email);
                await sendEmail(user.email, emailContent.subject, emailContent.text);
                console.log(`PlantCare ${plantCare._id} marked as not watered.`);
            };
        };
    };
};

setInterval(() => {
    plantCareTimer();
}, 60 * 1000);
