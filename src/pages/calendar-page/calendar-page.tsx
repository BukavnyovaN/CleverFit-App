import { Calendar } from 'antd';

import './calendar-page.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    accessTokenSelector,
    trainingsData,
    trainingsListSelector,
} from '@utils/helpers/selectors.ts';
import moment, { Moment } from 'moment';
import ru_Ru from 'antd/es/calendar/locale/ru_RU';
import { trainingBadgeColors } from '@constants/training-badge-colors.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { getTrainingsList } from '@redux/actions/get-trainings-list.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { NotificationModal } from '@components/notification-modal/notification-modal.tsx';
import { CalendarCell } from '@components/calendar-ceil/calendar-cell.tsx';
import { TrainingsDrawer } from '@components/trainings-drawer/trainings-drawer.tsx';
import { Exercise, TrainingParameters } from '@redux/actions/get-trainings.ts';
import { clearUpdatedTraining } from '@redux/slice/app/app-slice.ts';
import { DATE_FORMAT } from '@constants/date-format.ts';
import { useWindowWidth } from '@hooks/use-window-width.ts';

moment.locale('ru');
moment.updateLocale('ru', {
    weekdaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    monthsShort: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
    week: { dow: 1 },
});

export type ListData = {
    color: string;
    name: string;
    _id: string;
    userId: string;
    isImplementation: boolean;
    exercises: Exercise[];
    parameters: TrainingParameters;
    date: string;
};

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { width } = useWindowWidth();
    const [isDesktop, setIsDesktop] = useState(true);
    const trainings = useAppSelector(trainingsData);
    const trainingsList = useAppSelector(trainingsListSelector);
    const localStorageAccessToken = localStorage.getItem(AccessToken.token);
    const storeAccessToken = useAppSelector(accessTokenSelector);
    const accessToken = localStorageAccessToken || storeAccessToken;
    const [isErrorGettingTrainingsList, setIsErrorGettingTrainingsList] = useState(false);
    const [isErrorCreatingTraining, setIsErrorCreatingTraining] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [selectedDateModal, setSelectedDateModal] = useState('');
    const [selectedExersise, setSelectedExersise] = useState('');
    const [day, setDay] = useState(1);

    const getListData = (value: string) => {
        const listData: ListData[] = [];
        trainings.length > 0 &&
            trainingsList.length > 0 &&
            trainings.map((element) => {
                if (value === new Date(element.date).toLocaleString('ru').split(',')[0]) {
                    listData.push({
                        color: `${
                            trainingBadgeColors.find((training) => training.name === element.name)
                                ?.color
                        }`,
                        name: element.name,
                        userId: element.userId || '',
                        _id: element._id || '',
                        exercises: element.exercises,
                        parameters: element.parameters,
                        date: element.date,
                        isImplementation: element.isImplementation,
                    });
                }
            });
        return listData || [];
    };

    const handleCloseModal = () => {
        setSelectedDateModal('');
        dispatch(clearUpdatedTraining());
    };

    const handleSelectDate = (value: Moment) => {
        const date = value.format(DATE_FORMAT);
        if (date !== selectedDateModal) {
            setSelectedDateModal(date);
        }
        setDay(moment(value).day());
    };

    const dateCellRender = (value: Moment) => {
        const date = value.format(DATE_FORMAT);
        const listData = getListData(date);
        return (
            <CalendarCell
                day={day}
                isDesktop={isDesktop}
                handleSelect={setSelectedExersise}
                listData={listData}
                date={date}
                handleCloseModal={handleCloseModal}
                activeDateModal={selectedDateModal}
                setIsErrorCreatingTraining={setIsErrorCreatingTraining}
            />
        );
    };

    const getTrainingsNames = async () => {
        const response = await dispatch(getTrainingsList({ accessToken })).unwrap();
        if (response === RequestResult.error) {
            setIsErrorGettingTrainingsList(true);
            setIsNotificationOpen(true);
        }
    };

    const onCloseModal = () => {
        setIsNotificationOpen(false);
    };

    const onGetListHandler = async () => {
        await getTrainingsNames();
        setIsNotificationOpen(false);
    };

    useEffect(() => {
        if (Number(width) && Number(width) < 700) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, [width]);

    useEffect(() => {
        getTrainingsNames();
    }, []);

    useEffect(() => {
        if (isErrorCreatingTraining) {
            setIsNotificationOpen(true);
        }
    }, [isErrorCreatingTraining]);

    return (
        <>
            {(isErrorGettingTrainingsList || isErrorCreatingTraining) && (
                <NotificationModal
                    textButton={isErrorCreatingTraining ? 'Закрыть' : 'Обновить'}
                    onClickButton={onGetListHandler}
                    isCloseIcon={true}
                    title={
                        isErrorCreatingTraining
                            ? 'При сохранении данных произошла ошибка'
                            : 'При открытии данных произошла ошибка'
                    }
                    subtitle={
                        isErrorCreatingTraining
                            ? 'Придётся попробовать ещё раз'
                            : 'Попробуйте ещё раз.'
                    }
                    open={isNotificationOpen}
                    onClose={onCloseModal}
                />
            )}
            <div className={isDesktop ? 'calendar' : 'calendar-mobile'}>
                <Calendar
                    onSelect={handleSelectDate}
                    fullscreen={isDesktop}
                    locale={ru_Ru}
                    dateCellRender={dateCellRender}
                />
            </div>
            <TrainingsDrawer
                isDesktop={isDesktop}
                activeDateDrawer={selectedDateModal}
                selectedExercise={selectedExersise}
                getTrainingsData={getListData}
            />
        </>
    );
};
