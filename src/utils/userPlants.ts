import { userPlant } from '../models/userPlants';

export const plantObject = (plant: userPlant) => {
    return {
        _id: plant._id,
        plantName: plant.plantName,
        liter: plant.liter,
        wateringTime: plant.wateringTime,
        watering: plant.watering,
        createAt: plant.createdAt?.toLocaleString()
    }
};

export const mapPlantsList = (plants: userPlant[]) => {
    return plants.map((pcs) => plantObject(pcs));
};