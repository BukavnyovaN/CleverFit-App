import { Training } from '@redux/actions/get-trainings.ts';
import moment from 'moment';

export const getTrainingsBySelectedPeriod = (
    trainings: Training[],
    startDate,
    endDate,
): Training[] => {
    return trainings.filter((training) =>
        moment(training.date).isBetween(startDate, endDate, null, '[)'),
    );
};
