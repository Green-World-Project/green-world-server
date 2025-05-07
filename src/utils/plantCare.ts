import { PlantCare } from '../models/plantCare';
import { Plant } from '../services/plantsService'

export const plantCareObject = (userPlant: PlantCare, plants: (Plant | Plant[])) => {
    if (!plants) throw new Error(`Plants not found`);

    const plant: Plant = Array.isArray(plants)
        ? (plants.find((plant) => userPlant.plantID.toString() == plant._id.toString()) as Plant)
        : (plants as Plant);

    if (!plant) throw new Error(`Plant not found`);

    return {
        _id: userPlant._id,
        plant_name: plant.plant_name,
        waterNeed: userPlant.waterNeed,
        groundArea: userPlant.groundArea,
        nextWateringDate: !userPlant.isWatered ? new Date().toLocaleString() :
            new Date(
                new Date(userPlant.lastWateredAt || Date.now()).getTime() +
                (Number(plant.water_duration_days) || 0) * 24 * 60 * 60 * 1000
            ).toLocaleString(),
        isWatered: userPlant.isWatered,
        info: {
            category: plant.category,
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
        updatedAt: userPlant.updatedAt?.toLocaleString(),
    };
};

export const mapPlantCareList = (userPlants: PlantCare[], plants: Plant[]) => {
    return userPlants.map((userPlant) => plantCareObject(userPlant, plants));
};