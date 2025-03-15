import { History } from '../models/history';

export const plantIdentObject = (history: History) => {
    return {
        _id: history._id,
        photo: `https://res.cloudinary.com/dtbrnazjf/image/upload/history/${history.fileName}`,
        info: {
            name: history.info.name,
            condition: history.info.condition
        }
    }
};

export const mapPlantIdentList = (dataList: any[]) => {
    return dataList.map((data) => plantIdentObject(data));
};