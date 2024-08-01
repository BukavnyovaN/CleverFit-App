import { Exercise } from '@utils/helpers/generate-trainings-data.ts';
import { Training } from '@redux/actions/get-trainings.ts';
import { Nullable } from '../../types/nullable.type.ts';

export const generateJoinTrainingData = (
    userId: string,
    date: string,
    period: Nullable<number>,
    repeat: boolean,
    trainingType: string,
    exercises: Exercise[],
): Training => {
    const filteredExercises = exercises.filter((exercise) => exercise.name.trim() !== '');

    return {
        name: trainingType,
        date: date,
        isImplementation: false,
        parameters: {
            repeat,
            period,
            jointTraining: true,
            participants: [userId],
        },
        exercises: filteredExercises,
    };
};
