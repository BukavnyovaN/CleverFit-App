import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { DATE_FORMAT } from '@constants/date-format.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsData } from '@utils/helpers/selectors.ts';
import { isFutureDate } from '@utils/helpers/check-is-future-date.ts';
import { Dispatch, SetStateAction } from 'react';

type customDatePickerProps = {
    setSelectedDate: Dispatch<SetStateAction<string>>;
    defaultValue?: string;
};

export const CustomDatePicker = ({ setSelectedDate, defaultValue }: customDatePickerProps) => {
    const trainings = useAppSelector(trainingsData);
    const dateCellRender = (pickerDate: Moment) => {
        const formattedDate = pickerDate.format(DATE_FORMAT);
        const hasTrainings = trainings.some((training) => {
            const trainingDate = moment(training.date).format(DATE_FORMAT);
            return trainingDate === formattedDate;
        });

        if (hasTrainings) {
            return <div style={{ backgroundColor: '#F0F5FF' }}>{pickerDate.date()}</div>;
        }

        return pickerDate.date();
    };

    const selectTrainingDateHandler = (pickerDate: Moment | null) => {
        setSelectedDate(moment(pickerDate).format(DATE_FORMAT));
    };
    const disabledDateHandler = (pickerDate: Moment) => {
        const formattedDate = pickerDate.format(DATE_FORMAT);
        return !isFutureDate(formattedDate);
    };

    return (
        <DatePicker
            data-test-id='modal-drawer-right-date-picker'
            format={DATE_FORMAT}
            size='small'
            defaultValue={defaultValue ? moment(defaultValue) : undefined}
            disabledDate={disabledDateHandler}
            dateRender={dateCellRender}
            onChange={(value) => selectTrainingDateHandler(value)}
        />
    );
};
