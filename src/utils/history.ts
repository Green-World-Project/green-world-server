import { History } from '../models/history';

export const historyObject = (history: History) => {
    return {
        _id: history._id,
        photo: `https://res.cloudinary.com/dtbrnazjf/image/upload/history/${history.fileName}`,
        info: {
            name: history.info.name,
            condition: history.info.condition
        },
        createAt: history.createdAt?.toLocaleString()
    }
};

export const mapHistoryList = (historyList: History[]) => {
    return historyList.map((history) => historyObject(history));
};