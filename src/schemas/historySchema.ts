import * as Yup from 'yup';

export const historySchema = Yup.object().shape({
    fileName: Yup.string().required(),
    info: Yup.object().shape({
        name: Yup.string().required(),
        condition: Yup.string().required()
    })
});