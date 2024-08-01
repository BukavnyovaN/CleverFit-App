import { formatDateToIsoString } from '@utils/helpers/format-date-to-iso-string.ts';
import { Nullable } from '../../types/nullable.type.ts';

export type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type NewTraining = {
    name: string;
    date: Nullable<string>;
    isImplementation: boolean;
    parameters: {
        repeat: boolean;
        period: Nullable<number>;
        jointTraining: boolean;
        participants?: string[];
    };
    exercises: Exercise[];
};

export const generateExerciseData = (
    exerciseName: string,
    exerciseDate: string,
    exerciseList: Exercise[],
    repeat = false,
    period: Nullable<number>,
    jointTrainig = false,
): NewTraining => {
    return {
        name: exerciseName,
        date: formatDateToIsoString(exerciseDate),
        isImplementation: false,
        parameters: {
            repeat: repeat,
            period: period || null,
            jointTraining: jointTrainig,
            participants: [],
        },
        exercises: exerciseList.map((exercise) => ({
            name: exercise.name,
            replays: exercise.replays || 0,
            weight: exercise.weight || 0,
            approaches: exercise.approaches || 0,
            isImplementation: false,
        })),
    };
};

export const generateExerciseList = (
    name: string,
    replays: number | null,
    weight: number | null,
    approaches: number | null,
) => {
    return {
        name: name,
        replays: replays || 0,
        weight: weight || 0,
        approaches: approaches || 0,
        isImplementation: false,
    };
};
