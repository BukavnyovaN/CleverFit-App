import { Training } from '@redux/actions/get-trainings.ts';
import { weekdayNames } from '@constants/weekdays.ts';

export type PopularExerciseByWeekday = {
    day: string;
    exercise: string;
    count: number;
};

export const getMostPopularExerciseByWeekday = (
    trainings: Training[],
): PopularExerciseByWeekday[] => {
    const exerciseCountsByWeekday: { [weekday: string]: { [exercise: string]: number } } =
        weekdayNames.reduce((acc, weekday) => ({ ...acc, [weekday]: {} }), {});

    trainings.forEach((training) => {
        const weekday = getDayOfWeek(training.date);
        training.exercises.forEach((exercise) => {
            exerciseCountsByWeekday[weekday][exercise.name] =
                (exerciseCountsByWeekday[weekday][exercise.name] || 0) + 1;
        });
    });

    const result: PopularExerciseByWeekday[] = [];

    for (const weekday of weekdayNames) {
        const exerciseCounts = exerciseCountsByWeekday[weekday];
        const sortedExercises = Object.entries(exerciseCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([exercise, count]) => ({ exercise, count }));

        const popularExercise = sortedExercises[0] || { exercise: '', count: 0 };
        result.push({
            day: weekday,
            exercise: popularExercise.exercise,
            count: popularExercise.count,
        });
    }

    return result;
};

const getDayOfWeek = (dateString: string): string => {
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return weekdayNames[(dayIndex + 6) % 7];
};
