import { Training } from '@redux/actions/get-trainings.ts';
import { StatsPeriod } from '../../enums/stats-period.enum.ts';

export const calculateLoadStats = (
    data: Training[],
    period: StatsPeriod,
): { totalLoad: number; avgLoadPerDay: number; totalReplays: number; totalApproaches: number } => {
    const daysInPeriod = period === 'week' ? 7 : 28;

    const totalLoad = data.reduce((sum, training) => {
        const exerciseLoad = training.exercises.reduce((exerciseSum, exercise) => {
            return exerciseSum + exercise.weight * exercise.approaches * exercise.replays;
        }, 0);
        return sum + exerciseLoad;
    }, 0);

    const totalReplays = data.reduce((sum, training) => {
        const replays = training.exercises.reduce((replaysSum, exercise) => {
            return replaysSum + exercise.replays;
        }, 0);
        return sum + replays;
    }, 0);

    const totalApproaches = data.reduce((sum, training) => {
        const approaches = training.exercises.reduce((approachesSum, exercise) => {
            return approachesSum + exercise.approaches;
        }, 0);
        return sum + approaches;
    }, 0);

    const avgLoadPerDay = +(totalLoad / daysInPeriod).toFixed(1);

    return {
        totalLoad,
        avgLoadPerDay,
        totalReplays,
        totalApproaches,
    };
};
