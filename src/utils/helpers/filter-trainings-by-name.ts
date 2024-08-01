import { Training } from '@redux/actions/get-trainings.ts';
import { AllFilter } from '../../enums/all-filter.enum.ts';

export const filterTrainingsByName = (trainings: Training[], selectedTraining: string) => {
    return selectedTraining === AllFilter.allFilter
        ? trainings
        : trainings.filter((training) => training.name === selectedTraining);
};
