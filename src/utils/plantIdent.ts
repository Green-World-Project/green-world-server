import { History } from '../models/history';

export const plantIdentObject = (data: History) => {
    return {
        photo: `https://res.cloudinary.com/dtbrnazjf/image/upload/history/${data.fileName}`,
        info: {
            name: data.info.name,
            condition: data.info.condition
        }
    }
};

export const mapplantIdentList = (dataList: any[]) => {
    return dataList.map((data) => plantIdentObject(data));
};