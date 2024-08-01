import { Training } from '@redux/actions/get-trainings.ts';
import { PopularExerciseByWeekday } from '@utils/helpers/get-most-popular-exercise-by-weekday.ts';

export const getExercisesCountMap = (
    trainings: Training[],
    weekdayData: PopularExerciseByWeekday[],
): { type: string; value: number }[] => {
    const exerciseCounts: { [key: string]: number } = {};
    const weekdayExercises = new Set(weekdayData.map((item) => item.exercise));

    trainings.forEach((training) => {
        training.exercises.forEach((exercise) => {
            if (weekdayExercises.has(exercise.name)) {
                exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1;
            }
        });
    });

    return Object.entries(exerciseCounts)
        .map(([type, value]) => ({ type, value }))
        .sort((a, b) => b.value - a.value);
};
