import * as Yup from 'yup';

export const addPlantSchema = Yup.object({
    plantName: Yup.string().required(),
    wateringTime: Yup.number().required(),
    watering: Yup.boolean().default(false).required()
});

export const updatePlantSchema = Yup.object({
    plantName: Yup.string(),
    wateringTime: Yup.number(),
    watering: Yup.boolean()
});


