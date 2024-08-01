import { JoinTraining } from '@redux/slice/trainings/trainings-slice.ts';

export const removeInvite = (data: JoinTraining[], _id: string): JoinTraining[] => {
    return data.filter((item) => item._id !== _id);
};
