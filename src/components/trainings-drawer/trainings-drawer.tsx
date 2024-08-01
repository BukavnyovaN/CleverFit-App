import { Badge, Button, Drawer } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    newTrainingSelector,
    trainingsDrawerSelector,
    updatedTrainingSelector,
} from '@utils/helpers/selectors.ts';
import {
    openEditTrainingsDrawer,
    openTrainingsDrawer,
    openViewTrainingsDrawer,
    saveNewTraining,
    saveUpdatedTraining,
} from '@redux/slice/app/app-slice.ts';
import { TrainingDrawerItem } from '@components/training-drawer-item/training-drawer-item.tsx';

import './trainings-drawer.css';
import { Exercise, generateExerciseData } from '@utils/helpers/generate-trainings-data.ts';
import { useEffect, useState } from 'react';
import { ListData } from '@pages/calendar-page/calendar-page.tsx';
import { generateUpdatedTrainingData } from '@utils/helpers/generate-updated-training-data.ts';
import { checkObjectByDateAndName } from '@utils/helpers/check-object-by-name-and-date.ts';
import { EMPTY_EXERCISE } from '@constants/empty-exercise.ts';

type TrainingsDrawerProps = {
    getTrainingsData: (value: string) => ListData[];
    isDesktop: boolean;
    activeDateDrawer: string;
    selectedExercise: string;
};

export const TrainingsDrawer = ({
    activeDateDrawer,
    selectedExercise,
    getTrainingsData,
    isDesktop,
}: TrainingsDrawerProps) => {
    const dispatch = useAppDispatch();
    const drawerState = useAppSelector(trainingsDrawerSelector);
    const newTrainingList = useAppSelector(newTrainingSelector);
    const updatedTraining = useAppSelector(updatedTrainingSelector);
    const [exercises, setExercises] = useState<Exercise[]>(newTrainingList.exercises);
    const [editTraining, setEditTraining] = useState<ListData[] | []>([]);
    const [editExercises, setEditExercises] = useState<Exercise[] | []>(updatedTraining.exercises);
    const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true);
    const getExercisesByTrainingName = (trainingName: string) => {
        const exercisesData = getTrainingsData(activeDateDrawer);
        const filteredExercises = exercisesData.filter(
            (exercise) => exercise.name === trainingName,
        );
        setEditTraining(filteredExercises);
        setEditExercises(filteredExercises[0]?.exercises);
        if (drawerState.isViewDrawer) {
            setExercises(filteredExercises[0]?.exercises);
        }
    };

    const onClose = async () => {
        if (drawerState.isEditDrawer && editTraining[0]?.exercises !== editExercises) {
            const filteredExercises = editExercises.filter((item) => item.name.trim() !== '');
            setExercises(
                filteredExercises.length > 0 ? filteredExercises : [{ ...EMPTY_EXERCISE }],
            );
            const updatedTrainingData = generateUpdatedTrainingData(
                editTraining[0],
                filteredExercises,
            );

            setEditExercises(filteredExercises);
            dispatch(saveUpdatedTraining(updatedTrainingData));
        } else {
            const filteredExercises = exercises.filter((item) => item.name.trim() !== '');
            setExercises(
                filteredExercises.length > 0 ? filteredExercises : [{ ...EMPTY_EXERCISE }],
            );
            const newTrainingList = generateExerciseData(
                selectedExercise,
                activeDateDrawer,
                filteredExercises,
                false,
                null,
                false,
            );
            dispatch(saveNewTraining(newTrainingList));
        }
        setIsDeleteButtonDisabled(true);
        dispatch(openEditTrainingsDrawer(false));
        dispatch(openTrainingsDrawer(false));
        dispatch(openViewTrainingsDrawer(false));
    };

    const handleAddClick = () => {
        if (drawerState.isEditDrawer) {
            const added = [...editExercises, { ...EMPTY_EXERCISE }];
            setEditExercises(added);
        } else {
            const addedExercise = [...exercises, { ...EMPTY_EXERCISE }];
            setExercises(addedExercise);
        }
    };

    const handleExerciseDelete = () => {
        const updatedExercises = editExercises.filter((exercise) => !exercise.isImplementation);
        setEditExercises(updatedExercises);
        const updatedTrainingData = generateUpdatedTrainingData(editTraining, updatedExercises);
        dispatch(saveUpdatedTraining(updatedTrainingData));
    };

    const handleExerciseInputChange = (
        exerciseIndex: number,
        field: keyof Exercise,
        value: string | number | boolean,
    ) => {
        if (drawerState.isEditDrawer) {
            const updatedExercises = [...editExercises];
            updatedExercises[exerciseIndex] = {
                ...updatedExercises[exerciseIndex],
                [field]: value,
            };
            setEditExercises(updatedExercises);
            const hasImplementedExercises = editExercises.some(
                (exercise) => exercise.isImplementation,
            );
            setIsDeleteButtonDisabled(hasImplementedExercises);
            const updatedTrainingData = generateUpdatedTrainingData(
                editTraining[0],
                updatedExercises,
            );
            dispatch(saveUpdatedTraining(updatedTrainingData));
        } else {
            const updatedExercises = [...exercises];
            updatedExercises[exerciseIndex] = {
                ...updatedExercises[exerciseIndex],
                [field]: value,
            };
            const newTrainingList = generateExerciseData(
                selectedExercise,
                activeDateDrawer,
                updatedExercises,
                false,
                null,
                false,
            );
            dispatch(saveNewTraining(newTrainingList));
            setExercises(updatedExercises);
        }
    };

    useEffect(() => {
        const isDateAndTrainingNameMatch = checkObjectByDateAndName(
            newTrainingList,
            activeDateDrawer,
            selectedExercise,
        );
        !drawerState.isViewDrawer && isDateAndTrainingNameMatch
            ? setExercises(newTrainingList.exercises)
            : setExercises([{ ...EMPTY_EXERCISE }]);
        getExercisesByTrainingName(selectedExercise);
    }, [activeDateDrawer, selectedExercise]);

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            placement={isDesktop ? 'right' : 'bottom'}
            closable={false}
            onClose={onClose}
            open={drawerState.isTrainingsDrawer}
            className={isDesktop ? '' : 'drawer-mobile'}
            mask={false}
        >
            <div className='trainings-drawer__wrapper'>
                <div className='trainings-drawer__header'>
                    {drawerState.isEditDrawer ? (
                        <>
                            <div className='trainings-drawer__header-title'>
                                <EditOutlined
                                    style={{
                                        color: 'var(--color-primary-black)',
                                        height: '14px',
                                        width: '14px',
                                    }}
                                />
                                <div>Редактирование</div>
                            </div>
                            <CloseOutlined
                                data-test-id='modal-drawer-right-button-close'
                                onClick={onClose}
                            />
                        </>
                    ) : (
                        <>
                            {drawerState.isViewDrawer ? (
                                <>
                                    <div>Просмотр упражнений</div>
                                    <CloseOutlined
                                        data-test-id='modal-drawer-right-button-close'
                                        onClick={onClose}
                                    />
                                </>
                            ) : (
                                <>
                                    <div>+ Добавление упражнений</div>
                                    <CloseOutlined
                                        data-test-id='modal-drawer-right-button-close'
                                        onClick={onClose}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
                <div className='trainings-drawer__info'>
                    <Badge status={'success'} text={selectedExercise || updatedTraining.name} />
                    <div>{activeDateDrawer}</div>
                </div>
                {drawerState.isEditDrawer
                    ? editExercises?.map((element, index) => (
                          <TrainingDrawerItem
                              key={index}
                              id={index}
                              onInputChange={handleExerciseInputChange}
                              approachesValue={element.approaches}
                              weightValue={element.weight}
                              nameValue={element.name}
                              replaysValue={element.replays}
                              isImplementationValue={element.isImplementation}
                          />
                      ))
                    : exercises?.map((element, index) => (
                          <TrainingDrawerItem
                              key={index}
                              id={index}
                              onInputChange={handleExerciseInputChange}
                              approachesValue={element.approaches}
                              weightValue={element.weight}
                              nameValue={element.name}
                              replaysValue={element.replays}
                              isImplementationValue={element.isImplementation}
                          />
                      ))}
                {drawerState.isEditDrawer && (
                    <div className='trainings-drawer__button-group'>
                        <Button
                            className='trainings-drawer__button-group-add'
                            onClick={handleAddClick}
                        >
                            + Добавить ещё
                        </Button>
                        <Button
                            className='trainings-drawer__button-group-delete'
                            onClick={handleExerciseDelete}
                            disabled={isDeleteButtonDisabled}
                        >
                            - Удалить
                        </Button>
                    </div>
                )}
                {!drawerState.isViewDrawer && !drawerState.isEditDrawer && (
                    <Button onClick={handleAddClick} className='trainings-drawer__button'>
                        + Добавить ещё{' '}
                    </Button>
                )}
            </div>
        </Drawer>
    );
};
