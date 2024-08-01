import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { TrainingList } from '../../types/trainings-list.type.ts';
import { ListData } from '@pages/calendar-page/calendar-page.tsx';
import { Exercise, getTrainings, Training } from '@redux/actions/get-trainings.ts';
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import {
    clearNewTraining,
    clearUpdatedTraining,
    openEditTrainingsDrawer,
    openTrainingsDrawer,
} from '@redux/slice/app/app-slice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { NewTraining } from '@utils/helpers/generate-trainings-data.ts';
import { postTraining } from '@redux/actions/post-training.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import {
    accessTokenSelector,
    loadingSelector,
    newTrainingSelector,
    updatedTrainingSelector,
} from '@utils/helpers/selectors.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { generatePutRequestBody } from '@utils/helpers/generate-put-request-body.ts';
import { putTraining } from '@redux/actions/put-training.ts';
import { isFutureDate } from '@utils/helpers/check-is-future-date.ts';

type CalendarExercisesModalProps = {
    handleSelect: Dispatch<SetStateAction<string>>;
    date: string;
    setIsCreateTraining: Dispatch<SetStateAction<boolean>>;
    isErrorCreatingTraining: Dispatch<SetStateAction<boolean>>;
    trainings: ListData[];
    trainingsList: TrainingList[];
    isEditTraining: boolean;
    setIsEditTraining: Dispatch<SetStateAction<boolean>>;
};

export const CalendarExercisesModal = ({
    handleSelect,
    date,
    isErrorCreatingTraining,
    trainings,
    trainingsList,
    setIsCreateTraining,
    isEditTraining,
    setIsEditTraining,
}: CalendarExercisesModalProps) => {
    const localStorageAccessToken = localStorage.getItem(AccessToken.token);
    const storeAccessToken = useAppSelector(accessTokenSelector);
    const newTrainings = useAppSelector(newTrainingSelector);
    const loading = useAppSelector(loadingSelector);
    const updatedTraining = useAppSelector(updatedTrainingSelector);
    const accessToken = localStorageAccessToken || storeAccessToken;
    const [selectedTrainig, setSelectedTraining] = useState(trainings[0]?.name);
    const [newExercises, setNewExersises] = useState<Exercise[] | []>([]);
    const [updatedExercises, setUpdatedExersises] = useState<Training>(trainings[0]);
    const dispatch = useAppDispatch();

    const createExerciseData = (newTraining: NewTraining) => {
        if (selectedTrainig === newTraining.name) {
            setNewExersises(newTraining.exercises);
        } else {
            setNewExersises([]);
        }
    };

    const updateExerciseData = (updatedTraining: Training) => {
        if (
            updatedTraining.exercises.length > 0 &&
            updatedTraining.exercises !== trainings[0]?.exercises
        ) {
            setUpdatedExersises(updatedTraining);
        } else {
            setUpdatedExersises(trainings[0]);
        }
    };

    const handleSave = async () => {
        const response = await dispatch(
            postTraining({
                accessToken,
                newTraining: newTrainings,
            }),
        ).unwrap();
        if (response === RequestResult.error) {
            isErrorCreatingTraining(true);
            await dispatch(getTrainings({ accessToken }));
            dispatch(clearNewTraining());
            handleSelect('');
            setIsCreateTraining(false);
        }
        await dispatch(getTrainings({ accessToken }));
        dispatch(clearNewTraining());
        handleSelect('');
        setIsCreateTraining(false);
    };

    const handleEdit = async () => {
        const requestBody = generatePutRequestBody(updatedTraining);
        const id = updatedTraining._id || '';
        const response = await dispatch(
            putTraining({
                accessToken,
                id,
                updatedTraining: requestBody,
            }),
        ).unwrap();
        if (response === RequestResult.error) {
            isErrorCreatingTraining(true);
            await dispatch(getTrainings({ accessToken }));
            dispatch(clearUpdatedTraining());
            handleSelect('');
            setIsEditTraining(false);
        }
        await dispatch(getTrainings({ accessToken }));
        dispatch(clearUpdatedTraining());
        handleSelect('');
        setIsEditTraining(false);
    };

    const handleCloseAction = () => {
        setIsEditTraining(false);
        setIsCreateTraining(false);
    };

    const onSelect = (value: string) => {
        setSelectedTraining(value);
        setIsEditTraining(false);
        setIsCreateTraining(true);
        handleSelect(value);
    };

    const handleAddTraining = () => {
        dispatch(openTrainingsDrawer(true));
    };

    const handleEditTraining = () => {
        dispatch(openEditTrainingsDrawer(true));
        dispatch(openTrainingsDrawer(true));
    };

    useLayoutEffect(() => {
        createExerciseData(newTrainings);
    }, [newTrainings, selectedTrainig, date]);

    useEffect(() => {
        handleSelect(selectedTrainig);
        updateExerciseData(updatedTraining);
    }, [updatedTraining, selectedTrainig, date]);

    return (
        <div data-test-id='modal-create-exercise'>
            <div className='create-training__wrapper'>
                <div onClick={handleCloseAction}>
                    <ArrowLeftOutlined
                        data-test-id='modal-exercise-training-button-close'
                        style={{ color: 'var(--character-light-primary)' }}
                    />
                </div>
                {isEditTraining ? (
                    <Select
                        data-test-id='modal-create-exercise-select'
                        defaultValue={trainings[0].name}
                        style={{ width: 220 }}
                        bordered={false}
                        options={trainingsList.map(({ name }) => ({
                            value: name,
                            label: name,
                            key: name,
                        }))}
                        onSelect={(value) => onSelect(value)}
                    />
                ) : (
                    <Select
                        data-test-id='modal-create-exercise-select'
                        defaultValue='Выбор типа тренировки'
                        style={{ width: 220 }}
                        bordered={false}
                        options={trainingsList.map(({ name }) => ({
                            value: name,
                            label: name,
                            key: name,
                        }))}
                        onSelect={(value) => onSelect(value)}
                    />
                )}
            </div>
            <div className={'cell-modal__training-items'}>
                {isEditTraining
                    ? updatedExercises?.exercises.map((exercise, index: number) => (
                          <div className='cell-modal__training-item' key={exercise.name + index}>
                              <div>{exercise.name}</div>
                              <Button
                                  type='text'
                                  disabled={exercise.isImplementation}
                                  data-test-id={'modal-update-training-edit-button' + index}
                                  icon={
                                      <EditOutlined
                                          style={{ color: 'var(--primary-light-blue)' }}
                                      />
                                  }
                                  onClick={handleEditTraining}
                              ></Button>
                          </div>
                      ))
                    : newExercises.map((element, index: number) => (
                          <div className='cell-modal__training-item' key={element.name}>
                              <div>{element.name}</div>
                              <div
                                  data-test-id={'modal-update-training-edit-button' + index}
                                  onClick={handleAddTraining}
                              >
                                  <EditOutlined style={{ color: 'var(--primary-light-blue)' }} />
                              </div>
                          </div>
                      ))}
            </div>
            <div className='create-training__buttons'>
                <Button disabled={!selectedTrainig} onClick={handleAddTraining}>
                    Добавить упражнения
                </Button>
                {isEditTraining ? (
                    <Button
                        className={'button_save'}
                        disabled={!updatedTraining.exercises.length}
                        onClick={handleEdit}
                        loading={loading}
                        type='link'
                    >
                        {isFutureDate(date) ? 'Сохранить' : 'Сохранить изменения'}
                    </Button>
                ) : (
                    <Button
                        className={'button_save'}
                        disabled={!newTrainings.exercises.length}
                        onClick={handleSave}
                        loading={loading}
                        type='link'
                    >
                        Сохранить
                    </Button>
                )}
            </div>
        </div>
    );
};
