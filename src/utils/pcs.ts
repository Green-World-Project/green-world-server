import { PCS } from '../models/pcs';

export const userObject = (pcs: PCS) => {
    return {
        _id: pcs._id,
        plantName: pcs.plantName,
        wateringTime: pcs.wateringTime,
        watering: pcs.watering,
    }
};

export const mapUserList = (pcsList: PCS[]) => {
    return pcsList.map((pcs) => userObject(pcs));
};