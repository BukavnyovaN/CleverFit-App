import moment, { Moment } from 'moment';
import { Training } from '@redux/actions/get-trainings.ts';

export type TrainingLoad = {
    date: string;
    load: number;
    weekday?: string;
};

export const getAvgLoad = (
    startDate: Moment,
    endDate: Moment,
    selectedPeriodTrainings: Training[],
    formatDate: string,
) => {
    const data: TrainingLoad[] = [];
    const currentDate = moment(startDate);
    const currentEndDate = moment(endDate);

    while (currentDate.isSameOrBefore(currentEndDate, 'day')) {
        const currentFormatDate = currentDate.format(formatDate);
        const trainingsDate = selectedPeriodTrainings.filter(
            (training) => moment(training.date).format(formatDate) === currentFormatDate,
        );

        if (trainingsDate.length >= 0) {
            const totalLoad = trainingsDate.reduce((acc, training) => {
                const exercisesLoad = training.exercises.reduce((total, exercise) => {
                    return total + exercise.approaches * exercise.weight * exercise.replays;
                }, 0);
                return acc + exercisesLoad;
            }, 0);

            const exercisesCount = trainingsDate.reduce(
                (acc, training) => acc + training.exercises.length,
                0,
            );

            const averageLoad = exercisesCount > 0 ? totalLoad / exercisesCount : 0;

            data.push({ date: currentFormatDate, load: Math.round(averageLoad) });
        } else {
            data.push({ date: currentFormatDate, load: 0 });
        }

        currentDate.add(1, 'day');
    }

    return data;
};
