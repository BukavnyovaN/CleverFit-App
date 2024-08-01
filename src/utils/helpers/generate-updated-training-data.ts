import { Exercise, Training } from '@redux/actions/get-trainings.ts';
import { isFutureDate } from '@utils/helpers/check-is-future-date.ts';
import { formatDate } from '@utils/helpers/format-date-to-iso-string.ts';

export const generateUpdatedTrainingData = (
    trainingListData: Training,
    updatedExercises: Exercise[],
): Training => {
    const trainingDate = formatDate(trainingListData?.date);

    const training: Training = {
        _id: trainingListData?._id,
        name: trainingListData?.name,
        date: trainingListData?.date,
        isImplementation: isFutureDate(trainingDate)
            ? trainingListData?.exercises[0]?.isImplementation
            : true,
        userId: trainingListData?.userId,
        parameters: trainingListData?.parameters,
        exercises: [],
    };

    training.exercises = updatedExercises;

    return training;
};
