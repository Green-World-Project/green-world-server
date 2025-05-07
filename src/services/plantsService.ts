import { getDatabase } from '../config/mongodb';
import { mapPlantsList } from '../utils/plants';
import { Double, Types } from "mongoose";
import { InternalServerError, NotFoundError } from '../utils/ApiError';

export interface Plant {
    _id: Types.ObjectId,
    plant_name: string,
    category: string,
    ideal_soil_moisture_percentage: number,
    optimal_temperature_celsius: Double,
    light_exposure_hours: number,
    optimal_soil_ph_level: Double,
    recommended_npk_ratio: string,
    water_duration_days: number,
    daily_water_requirement_liters_per_m2: Double,
    humidity_percentage: Double,
    plant_description: string
};

export const getPlants = async (plantID?: Types.ObjectId) => {
    const database = getDatabase();
    if (!database) throw new InternalServerError("Database connection is undefined");
    const collection = database.collection('plants');
    if (plantID) return await collection.findOne({ _id: new Types.ObjectId(plantID) });
    else return await collection.find().toArray()
};

export const getPlantsService = async () => {
    const database = getDatabase();
    if (!database) throw new InternalServerError("Database connection is undefined");
    const collection = database.collection('plants');
    const result = await collection.find().toArray();
    if (!result) throw new NotFoundError('Plants not found');
    return mapPlantsList(result as Plant[]);
};