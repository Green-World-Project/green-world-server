import * as Yup from 'yup';

export const createPlantSchema = Yup.object({
    plantID: Yup.string().required(),
    groundArea: Yup.number().required(),
    isWatered: Yup.boolean().default(false).required(),
});

export const updatePlantSchema = Yup.object({
    plantName: Yup.string(),
    groundArea: Yup.number(),
    isWatered: Yup.boolean(),
});


