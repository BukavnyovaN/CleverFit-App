import { Training } from '@redux/actions/get-trainings.ts';

export const getMostPopularTrainingAndExercise = (
    trainings: Training[],
): { trainingName: string; exerciseName: string } => {
    const trainingCounts: {
        [exerciseName: string]: number;
    } = {};
    const exerciseCounts: {
        [trainingName: string]: number;
    } = {};

    trainings.forEach((training) => {
        trainingCounts[training.name] = (trainingCounts[training.name] || 0) + 1;

        training.exercises.forEach((exercise) => {
            exerciseCounts[exercise.name] = (exerciseCounts[exercise.name] || 0) + 1;
        });
    });

    let mostPopularTrainingName;
    let maxTrainingCount = 0;
    for (const trainingName in trainingCounts) {
        if (trainingCounts[trainingName] > maxTrainingCount) {
            mostPopularTrainingName = trainingName;
            maxTrainingCount = trainingCounts[trainingName];
        }
    }

    let mostPopularExerciseName;
    let maxExerciseCount = 0;
    for (const exerciseName in exerciseCounts) {
        if (exerciseCounts[exerciseName] > maxExerciseCount) {
            mostPopularExerciseName = exerciseName;
            maxExerciseCount = exerciseCounts[exerciseName];
        }
    }

    return {
        trainingName: mostPopularTrainingName || '',
        exerciseName: mostPopularExerciseName || '',
    };
};
