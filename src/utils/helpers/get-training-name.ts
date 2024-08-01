import { trainingBadgeColors } from '@constants/training-badge-colors.ts';

export const getNameByKey = (key: string): string | undefined => {
    const matchingItem = trainingBadgeColors.find((item) => item.key === key);
    return matchingItem ? matchingItem.name : undefined;
};
