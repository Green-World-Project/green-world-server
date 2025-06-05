import UserModel from '../models/user';
import plantCareModel, { PlantCare } from '../models/plantCare';
import { plantCareObject, mapPlantCareList } from '../utils/plantCare';
import { getPlants, Plant } from './plantsService';
import { Types } from "mongoose";
import { sendEmail } from '../utils/email';
import { generateWaterReminderEmail } from '../utils/emailTemplates';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../utils/ApiError';
import { CronJob } from 'cron';

export const getPlantCareService = async (userID: Types.ObjectId) => {
    const checkUser = await UserModel.findById(userID);
    if (!checkUser) throw new UnauthorizedError("Unauthorized");

    const result = await plantCareModel.aggregate([
        { $match: { userID: checkUser._id } },
        { $sort: { createdAt: -1 } },
        {
            $addFields: {
                logs: { $reverseArray: { $sortArray: { input: "$logs", sortBy: { wateringDate: 1 } } } }
            }
        }
    ]);

    const plants = await getPlants() as Plant[];
    if (result) return mapPlantCareList(result as PlantCare[], plants);
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
        logs: body.isWatered ? [{ wateringDate: new Date() }] : []
    });
    if (!result) throw new BadRequestError("Plant not added");
    return {
        message: "Added successfully",
        result: plantCareObject(result as PlantCare, plant as Plant),
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
    const result = await plantCareModel.findOneAndUpdate({ _id: id }, {
        plantID: plantID,
        waterNeed: waterNeed,
        groundArea: body.groundArea,
        isWatered: body.isWatered,
        ...(body.isWatered) ? { $push: { logs: { wateringDate: new Date() } } } : {},
    }, { new: true });
    if (!result) throw new BadRequestError("Plant not updated");
    return {
        message: "Updated successfully",
        result: plantCareObject(result as PlantCare, plant as Plant),
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
    if (!plants || !Array.isArray(plants)) throw new NotFoundError("Plants not found");
    for (const plantCare of plantCareList) {
        const plant = (plants as Plant[]).find((plant: Plant) => plant._id.toString() === plantCare.plantID.toString());
        if (!plant) continue;
        const lastWateredAt = plantCare.lastWateredAt ? new Date(plantCare.lastWateredAt).getTime() : 0;
        const nextWateringDate = lastWateredAt + (plant.water_duration_days || 0) * 24 * 60 * 60 * 1000;
        if (lastWateredAt >= nextWateringDate && plantCare.isWatered) {
            await plantCareModel.updateOne(
                { _id: plantCare._id },
                { $set: { isWatered: false } }
            );
            const user = await UserModel.findById(plantCare.userID);
            if (user) {
                const emailContent = generateWaterReminderEmail(plant.plant_name, user.firstName);
                await sendEmail(user.email, emailContent.subject, emailContent.text);
                console.log(`PlantCare ${plantCare._id} marked as not watered.`);
            };
        };
    };
};

const job = new CronJob(
    '* * * * *',
    async function () {
        await plantCareTimer();
    },
    null,  // onComplete (null means no function to run when the job stops)
    true,  // start the job right away
    null   // timezone (null means use the server's local timezone)
);