import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Badge, Button } from 'antd';
import './calendar-cell-modal.css';
import emptyImage from '../../assets/images/emptyImage.png';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ListData } from '@pages/calendar-page/calendar-page.tsx';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import {
    clearNewTraining,
    openTrainingsDrawer,
    openViewTrainingsDrawer,
} from '@redux/slice/app/app-slice.ts';

import { CalendarExercisesModal } from '@components/calendar-exercises-modal/calendar-exercises-modal.tsx';
import { TrainingList } from '../../types/trainings-list.type.ts';
import { isFutureDate } from '@utils/helpers/check-is-future-date.ts';
import { useSelector } from 'react-redux';
import { trainingsListSelector } from '@utils/helpers/selectors.ts';

type CalendarCeilModalProps = {
    handleClose: () => void;
    date: string;
    trainingsData: ListData[];
    handleSelect: Dispatch<SetStateAction<string>>;
    isErrorCreatingTraining: Dispatch<SetStateAction<boolean>>;
    day: number;
    isDesktop: boolean;
    modalPosition: DOMRect;
};

export const CalendarCellModal = ({
    handleClose,
    date,
    trainingsData,
    handleSelect,
    isErrorCreatingTraining,
    day,
    isDesktop,
    modalPosition,
}: CalendarCeilModalProps) => {
    const dispatch = useAppDispatch();
    const trainingsOptions = useSelector(trainingsListSelector);
    const [isCreateTraining, setIsCreateTraining] = useState(false);
    const [isEditTraining, setIsEditTraining] = useState(false);
    const [isAddTrainBtnDisabled, setIsAddTrainBtnDisabled] = useState(true);
    const [trainingsList, setTrainingsList] = useState<TrainingList[] | []>([]);
    const [trainings, setTrainings] = useState(trainingsData);
    const isTrainingsListEmpty = trainingsData.length === 0;

    const filterArray = (trainingsOption: TrainingList[], existingTrainings: ListData[]): void => {
        const existingTrainingsNames = existingTrainings.map((item) => item.name);
        const filteredArray = trainingsOption.filter(
            (item) => !existingTrainingsNames.includes(item.name),
        );
        setTrainingsList(filteredArray);
        filteredArray.length > 0 && isFutureDate(date)
            ? setIsAddTrainBtnDisabled(false)
            : setIsAddTrainBtnDisabled(true);
    };

    const handleCreateButton = () => {
        setIsCreateTraining(true);
    };

    const handleEditTraining = (training: ListData) => {
        setTrainings([training]);
        setIsEditTraining(true);
    };

    const handleViewTraining = (training: ListData) => {
        dispatch(openViewTrainingsDrawer(true));
        dispatch(openTrainingsDrawer(true));
        handleSelect(training.name);
    };

    const handleCloseAction = () => {
        dispatch(clearNewTraining());
        handleClose();
    };

    useEffect(() => {
        filterArray(trainingsOptions, trainingsData);
    }, [trainingsData]);

    return (
        <div
            data-test-id='modal-create-training'
            className={
                !isDesktop
                    ? 'cell-modal__mobile'
                    : day > 4 || day === 0
                    ? 'cell-modal__wrapper-left'
                    : 'cell-modal__wrapper-right'
            }
            style={!isDesktop ? { left: '-' + (Math.max(0, modalPosition?.left) - 24) + 'px' } : {}}
        >
            {!isCreateTraining && !isEditTraining && (
                <div>
                    <div className='top'>
                        <div>
                            <div className='cell-modal__title'>{`Tренировки на ${date}`}</div>
                            {isTrainingsListEmpty && (
                                <div className='cell-modal__message'>Нет активных тренировок</div>
                            )}
                        </div>
                        <div
                            data-test-id='modal-create-training-button-close'
                            onClick={handleCloseAction}
                        >
                            <CloseOutlined style={{ color: 'var(--character-light-primary)' }} />
                        </div>
                    </div>
                    {isTrainingsListEmpty ? (
                        <div className='cell-modal__image'>
                            <img src={emptyImage} alt={'empty'} />
                        </div>
                    ) : (
                        <div className='cell-modal__trainings'>
                            {trainingsData.map((item, index) =>
                                item.isImplementation ? (
                                    <div className='cell-modal__training-item' key={item._id}>
                                        <div>
                                            <Badge
                                                className={'fulfilled-exercise'}
                                                color={item.color}
                                                text={item.name}
                                            />
                                        </div>
                                        <Button
                                            type='text'
                                            disabled={item.isImplementation}
                                            data-test-id={
                                                'modal-update-training-edit-button' + index
                                            }
                                            icon={
                                                <EditOutlined
                                                    style={{ color: 'var(--primary-light-blue)' }}
                                                />
                                            }
                                            onClick={() => handleViewTraining(item)}
                                        ></Button>
                                    </div>
                                ) : (
                                    <div className='cell-modal__training-item' key={item._id}>
                                        <div>
                                            <Badge color={item.color} text={item.name} />
                                        </div>
                                        <Button
                                            type='text'
                                            disabled={item.isImplementation}
                                            data-test-id={
                                                'modal-update-training-edit-button' + index
                                            }
                                            icon={
                                                <EditOutlined
                                                    style={{ color: 'var(--primary-light-blue)' }}
                                                />
                                            }
                                            onClick={() => handleEditTraining(item)}
                                        ></Button>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
                    <Button
                        type='primary'
                        size='large'
                        className='cell-modal__button'
                        disabled={isAddTrainBtnDisabled}
                        onClick={handleCreateButton}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
            {(isCreateTraining || isEditTraining) && (
                <CalendarExercisesModal
                    date={date}
                    isErrorCreatingTraining={isErrorCreatingTraining}
                    trainingsList={trainingsList}
                    handleSelect={handleSelect}
                    trainings={trainings}
                    setIsCreateTraining={setIsCreateTraining}
                    setIsEditTraining={setIsEditTraining}
                    isEditTraining={isEditTraining}
                />
            )}
        </div>
    );
};
