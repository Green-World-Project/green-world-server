import * as Yup from 'yup';

export const addPlantSchema = Yup.object({
    plantID: Yup.string().required(),
    groundArea: Yup.number().required(),
    watering: Yup.boolean().default(false).required(),
});

export const updatePlantSchema = Yup.object({
    plantName: Yup.string(),
    groundArea: Yup.number(),
});


