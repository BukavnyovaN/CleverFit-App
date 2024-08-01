import { TrainingLoad } from '@utils/helpers/get-avg-load.ts';
import moment from 'moment';
import { DATE_FORMAT_DD_MM } from '@constants/date-format.ts';
import { weekdayNames } from '@constants/weekdays.ts';

export const sortDataByWeekdays = (data: TrainingLoad[]): TrainingLoad[] => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        const dateA = moment(a.date, DATE_FORMAT_DD_MM, true);
        const dateB = moment(b.date, DATE_FORMAT_DD_MM, true);
        const dayA = dateA.day() === 0 ? 7 : dateA.day(); // Treat Sunday as 7
        const dayB = dateB.day() === 0 ? 7 : dateB.day();

        if (dayA === dayB) {
            return 0;
        } else {
            return dayA - dayB;
        }
    });

    const mondayIndex = sortedData.findIndex((item) => {
        const day = moment(item.date, DATE_FORMAT_DD_MM, true).day();
        return day === 1;
    });

    const reorderedData = [...sortedData.slice(mondayIndex), ...sortedData.slice(0, mondayIndex)];

    return reorderedData.map((item) => ({
        ...item,
        weekday:
            weekdayNames[
                moment(item.date, DATE_FORMAT_DD_MM, true).day() === 0
                    ? 6
                    : moment(item.date, DATE_FORMAT_DD_MM, true).day() - 1
            ],
    }));
};
