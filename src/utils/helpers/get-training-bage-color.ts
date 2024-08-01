import { trainingBadgeColors } from '@constants/training-badge-colors.ts';

export const getTrainingsBadgeColor = (trainingName: string): string => {
    const trainingBadgeColor = trainingBadgeColors.find((color) => color.name === trainingName);

    if (trainingBadgeColor) {
        return trainingBadgeColor.color;
    }

    return '#f34556'; // Default color if no match is found
};
