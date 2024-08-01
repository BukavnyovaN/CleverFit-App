import { periodOptions } from '@constants/period-options.ts';
import { Nullable } from '@types/nullable.type.ts';

export const getPeriodOptionByNumber = (period: number): Nullable<string> => {
    const option = periodOptions.find((opt) => opt.period === period);
    return option ? option.item : null;
};
