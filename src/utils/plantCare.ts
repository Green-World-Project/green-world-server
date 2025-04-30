import { PlantCare } from '../models/plantCare';
import { Plant } from '../services/plantsService'

export const plantCareObject = (userPlant: PlantCare, plants: Plant[]) => {
    const plant = plants.find((plant) => userPlant.plantID.toString() == plant._id.toString());
    if (!plant) throw new Error(`Plant not found or multiple plants returned.`);
    return {
        _id: userPlant._id,
        plant_name: plant.plant_name,
        waterNeed: userPlant.waterNeed,
        groundArea: userPlant.groundArea,
        isWatered: userPlant.isWatered,
        info: {
            ideal_soil_moisture_percentage: plant.ideal_soil_moisture_percentage,
            optimal_temperature_celsius: plant.optimal_temperature_celsius,
            light_exposure_hours: plant.light_exposure_hours,
            optimal_soil_ph_level: plant.optimal_soil_ph_level,
            recommended_npk_ratio: plant.recommended_npk_ratio,
            water_duration_days: plant.water_duration_days,
            daily_water_requirement_liters_per_m2: plant.daily_water_requirement_liters_per_m2,
            humidity_percentage: plant.humidity_percentage,
            plant_description: plant.plant_description,
        },
        createdAt: userPlant.createdAt?.toLocaleString(),
    };
};

export const mapPlantCareList = (userPlants: PlantCare[], plants: Plant[]) => {
    return userPlants.map((userPlant) => plantCareObject(userPlant, plants));
};