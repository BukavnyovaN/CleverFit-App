import { Exercise, Training } from '@redux/actions/get-trainings.ts';
import { isFutureDate } from '@utils/helpers/check-is-future-date.ts';
import { formatDate, formatDateToIsoString } from '@utils/helpers/format-date-to-iso-string.ts';
import { Nullable } from '@types/nullable.type.ts';

export const updateTraining = (
    date: string,
    period: Nullable<number>,
    isRepeat: boolean,
    training: Training,
    updatedExercises: Exercise[],
): Training => {
    const trainingDate = formatDate(training.date);
    const selectedDate = date || trainingDate;
    const isInPastOrToday = !isFutureDate(selectedDate);
    const dateString = formatDateToIsoString(selectedDate);

    return {
        name: training.name,
        userId: training.userId,
        date: dateString || training.date,
        isImplementation: isInPastOrToday || training.isImplementation,
        parameters: {
            ...training.parameters,
            repeat: isRepeat,
            period: isRepeat ? period : null,
        },
        exercises: updatedExercises
            .filter((exercise) => exercise.name.trim() !== '')
            .map((exercise) => {
                const existingExercise = training.exercises.find((t) => t._id === exercise._id);
                return exercise || existingExercise;
            }),
    };
};
