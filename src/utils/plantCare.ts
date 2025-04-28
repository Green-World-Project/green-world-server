import { PlantCare } from '../models/plantCare';
import { getPlants } from '../services/plantCareService'

export const plantObject = async (userPlant: PlantCare) => {
    const plants = await getPlants(userPlant.plantID);
    if (!plants) throw new Error(`Plants not found.`);
    return {
        _id: userPlant._id,
        plant_name: plants.plant_name,
        waterNeed: userPlant.waterNeed,
        groundArea: userPlant.groundArea,
        isWatered: userPlant.isWatered,
        info: {
            ideal_soil_moisture_percentage: plants.ideal_soil_moisture_percentage,
            optimal_temperature_celsius: plants.optimal_temperature_celsius,
            light_exposure_hours: plants.light_exposure_hours,
            optimal_soil_ph_level: plants.optimal_soil_ph_level,
            recommended_npk_ratio: plants.recommended_npk_ratio,
            water_duration_days: plants.water_duration_days,
            daily_water_requirement_liters_per_m2: plants.daily_water_requirement_liters_per_m2,
            humidity_percentage: plants.humidity_percentage,
            plant_description: plants.plant_description,
        },
        createdAt: userPlant.createdAt?.toLocaleString(),
        updatedAt: userPlant.updatedAt?.toLocaleString(),
    };
};

export const mapPlantsList = async (userPlants: PlantCare[]) => {
    return await Promise.all(userPlants.map((userPlant) => plantObject(userPlant)));
};