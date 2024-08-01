import { periodItems } from '@constants/period-items.ts';

export const getPeriodName = (period: number | null | undefined): string => {
    const foundOption = periodItems.find((option) => option.period === period);
    return foundOption ? foundOption.item : '';
};
