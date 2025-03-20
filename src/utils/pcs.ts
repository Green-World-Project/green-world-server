import { Plant } from '../models/pcs';

export const plantObject = (plant: Plant) => {
    return {
        _id: plant._id,
        plantName: plant.plantName,
        liter: plant.liter,
        wateringTime: plant.wateringTime,
        watering: plant.watering,
        createAt: plant.createdAt?.toLocaleString()
    }
};

export const mapPlantsList = (plants: Plant[]) => {
    return plants.map((pcs) => plantObject(pcs));
};