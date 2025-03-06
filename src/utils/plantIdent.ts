import { History } from '../models/history';

export const plantIdentObject = (plant: History) => {
    return {
        _id: plant._id,
        photo: `https://res.cloudinary.com/dtbrnazjf/image/upload/history/${plant.fileName}`,
        info: {
            name: plant.info.name,
            condition: plant.info.condition
        }
    }
};

export const mapplantIdentList = (dataList: any[]) => {
    return dataList.map((data) => plantIdentObject(data));
};