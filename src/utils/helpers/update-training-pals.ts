import { TrainingPal } from '@redux/slice/trainings/trainings-slice.ts';

export const updateTrainingPals = (trainingPals: TrainingPal[], id: string): TrainingPal[] => {
    return trainingPals.filter((pal) => pal.inviteId !== id);
};
