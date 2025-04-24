import * as Yup from 'yup';

export const addPlantSchema = Yup.object({
    plantName: Yup.string().required(),
    groundArea: Yup.number().required(),
});

export const updatePlantSchema = Yup.object({
    plantName: Yup.string(),
    groundArea: Yup.number(),
});


