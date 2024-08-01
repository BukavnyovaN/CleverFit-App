import { Exercise, Training } from '@redux/actions/get-trainings.ts';
import { Nullable } from '../../types/nullable.type.ts';

type Parameters = {
    repeat: boolean;
    period: Nullable<number>;
    jointTraining: boolean;
    participants?: string[];
};
export type UpdatedTrainingBody = {
    name: string;
    date: string;
    isImplementation: boolean;
    parameters: Parameters;
    exercises: Exercise[];
};

export const generatePutRequestBody = (updatedTraining: Training): UpdatedTrainingBody => {
    const { name, date, isImplementation, parameters, exercises } = updatedTraining;

    return {
        name,
        date,
        isImplementation,
        parameters: {
            ...parameters,
            participants: [],
        },
        exercises: exercises.map((exercise) => ({
            name: exercise.name,
            replays: exercise.replays,
            weight: exercise.weight,
            approaches: exercise.approaches,
            isImplementation: exercise.isImplementation,
        })),
    };
};
