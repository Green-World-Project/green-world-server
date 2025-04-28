import * as Yup from 'yup';

export const createPlantCareSchema = Yup.object({
    plantID: Yup.string().required(),
    groundArea: Yup.number().required(),
    isWatered: Yup.boolean().default(false).required(),
});

export const updatePlantCareSchema = Yup.object({
    plantName: Yup.string(),
    groundArea: Yup.number(),
    isWatered: Yup.boolean(),
});


