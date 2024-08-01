import { Subscription } from '../../types/user-state.type.ts';

export type TariffsBody = {
    tariffId: string;
    days: number;
};

export const generateTariffByDays = (tariffs: Subscription, days: number): TariffsBody | null => {
    return {
        tariffId: tariffs._id,
        days: days,
    };
};
