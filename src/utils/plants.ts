import { Plant } from '../services/plantsService'

export const plantsObject = (plant: Plant) => {
    return {
        _id: plant._id,
        plant_name: plant.plant_name,
    };
};

export const mapPlantsList = (plant: Plant[]) => {
    return plant.map((plant) => plantsObject(plant));
};