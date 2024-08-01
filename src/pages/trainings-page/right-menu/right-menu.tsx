import { Avatar, Badge, Button, Checkbox, Drawer, Select } from 'antd';
import { CloseOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    joinUserSelector,
    joinUsersSelector,
    trainingIdSelector,
    trainingsDrawerSelector,
    trainingsListSelector,
    updatedTrainingSelector,
} from '@utils/helpers/selectors.ts';
import {
    clearNewTraining,
    clearUpdatedTraining,
    openEditTrainingsDrawer,
    openJoinTrainingsDrawer,
    openTrainingsDrawer,
    openViewTrainingsDrawer,
    saveNewTraining,
    saveUpdatedTraining,
} from '@redux/slice/app/app-slice.ts';
import { TrainingDrawerItem } from '@components/training-drawer-item/training-drawer-item.tsx';
import { Exercise, generateExerciseData } from '@utils/helpers/generate-trainings-data.ts';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { EMPTY_EXERCISE } from '@constants/empty-exercise.ts';
import { useWindowWidth } from '@hooks/use-window-width.ts';
import { CustomDatePicker } from '@components/custom-date-picker/custom-date-picker.tsx';
import { periodItems } from '@constants/period-items.ts';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import './right-menu.css';
import { postTraining } from '@redux/actions/post-training.ts';
import { getTrainings } from '@redux/actions/get-trainings.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { getPeriodName } from '@utils/helpers/get-period-name.ts';
import { updateTraining } from '@utils/helpers/update-trainings.ts';
import { putTraining } from '@redux/actions/put-training.ts';
import { RequestResult } from '../../../enums/request-result.enum.ts';
import { getTrainingsBadgeColor } from '@utils/helpers/get-training-bage-color.ts';
import { generateJoinTrainingData } from '@utils/helpers/generate-join-training-data.ts';
import { formatDateToIsoString } from '@utils/helpers/format-date-to-iso-string.ts';
import { sendInvite } from '@redux/actions/send-join-training-invite.ts';
import { getJoinTrainingUsers } from '@redux/actions/get-join-training-user.ts';
import { generateUpdatedTrainingData } from '@utils/helpers/generate-updated-training-data.ts';
import { updateUserData } from '@utils/helpers/update-users-data.ts';
import { saveJoinTrainingUsers } from '@redux/slice/trainings/trainings-slice.ts';
import { Nullable } from '../../../types/nullable.type.ts';

type RightMenuProps = {
    setIsErrorCreateTraining: Dispatch<SetStateAction<boolean>>;
    setIsSuccessCreateTraining: Dispatch<SetStateAction<boolean>>;
    setIsSuccessUpdateTraining: Dispatch<SetStateAction<boolean>>;
};

export const RightMenu = ({
    setIsErrorCreateTraining,
    setIsSuccessCreateTraining,
    setIsSuccessUpdateTraining,
}: RightMenuProps) => {
    const { width } = useWindowWidth();
    const [isDesktop, setIsDesktop] = useState(true);
    const dispatch = useAppDispatch();
    const trainingId = useAppSelector(trainingIdSelector);
    const drawerState = useAppSelector(trainingsDrawerSelector);
    const updatedTraining = useAppSelector(updatedTrainingSelector);
    const trainingsList = useAppSelector(trainingsListSelector);
    const joinTrainingUser = useAppSelector(joinUserSelector);
    const joinTrainingUsers = useAppSelector(joinUsersSelector);
    const [exercises, setExercises] = useState<Exercise[]>([{ ...EMPTY_EXERCISE }]);
    const [editExercises, setEditExercises] = useState<Exercise[]>(updatedTraining.exercises);
    const [selectedTrainig, setSelectedTraining] = useState('');
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedPeriod, setSelectedPeriod] = useState<Nullable<number>>(null);
    const [isRepeat, setIsRepeat] = useState(updatedTraining?.parameters?.repeat);
    const accessToken = useGetAccessToken();
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    const onClose = () => {
        if (drawerState.isJoinTrainingDrawer) {
            dispatch(getJoinTrainingUsers({ accessToken: accessToken }));
        }
        setSelectedDate('');
        setSelectedTraining('');
        dispatch(clearNewTraining());
        dispatch(clearUpdatedTraining());
        dispatch(openEditTrainingsDrawer(false));
        dispatch(openTrainingsDrawer(false));
        dispatch(openViewTrainingsDrawer(false));
        dispatch(openJoinTrainingsDrawer(false));
        setIsSaveButtonDisabled(true);
        if (drawerState.isJoinTrainingDrawer) {
            setSelectedPeriod(null);
            setIsRepeat(false);
        }
        setExercises([{ ...EMPTY_EXERCISE }]);
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

    const onSelect = (value: string) => {
        setSelectedTraining(value);
    };

    const handleCheckboxChange = (e: CheckboxChangeEvent) => {
        setIsRepeat(e.target.checked);
        if (drawerState.isEditDrawer) {
            setIsSaveButtonDisabled(false);
        }
    };

    const handleSelectPeriod = (value: string) => {
        setSelectedPeriod(+value);
        if (drawerState.isEditDrawer) {
            setIsSaveButtonDisabled(false);
        }
    };

    const handleSendInvite = async () => {
        const date = formatDateToIsoString(selectedDate);
        const joinTrainingData = generateJoinTrainingData(
            joinTrainingUser?.id || '',
            date || '',
            selectedPeriod,
            isRepeat,
            joinTrainingUser?.trainingType || '',
            exercises,
        );
        const response = await dispatch(
            postTraining({
                accessToken: accessToken,
                newTraining: joinTrainingData,
                isJoinTraining: true,
            }),
        ).unwrap();
        if (response === RequestResult.error) {
            setIsErrorCreateTraining(true);
            dispatch(clearNewTraining());
        } else {
            const inviteResult = await dispatch(
                sendInvite({
                    accessToken: accessToken,
                    to: joinTrainingUser?.id,
                    trainingId: response,
                }),
            ).unwrap();
            if (inviteResult === RequestResult.error) {
                setIsErrorCreateTraining(true);
            } else {
                setIsErrorCreateTraining(false);
                const updatedUserData = updateUserData(joinTrainingUsers, joinTrainingUser?.id);
                dispatch(saveJoinTrainingUsers(updatedUserData));
                await dispatch(getJoinTrainingUsers({ accessToken: accessToken }));
            }
        }
        onClose();
    };

    const handleSave = async () => {
        if (drawerState.isEditDrawer) {
            const updatedTrainingData = updateTraining(
                selectedDate,
                selectedPeriod || updatedTraining?.parameters?.period,
                isRepeat,
                updatedTraining,
                editExercises,
            );

            const response = await dispatch(
                putTraining({
                    accessToken: accessToken,
                    id: updatedTraining._id || trainingId,
                    updatedTraining: updatedTrainingData,
                }),
            ).unwrap();
            if (response === RequestResult.success) {
                setIsSuccessUpdateTraining(true);
            } else {
                setIsErrorCreateTraining(true);
            }
        } else {
            const filteredExercises = exercises.filter((item) => item.name.trim() !== '');
            setExercises(
                filteredExercises.length > 0 ? filteredExercises : [{ ...EMPTY_EXERCISE }],
            );
            const newTrainingList = generateExerciseData(
                selectedTrainig,
                selectedDate,
                filteredExercises,
                isRepeat,
                selectedPeriod,
            );

            dispatch(saveNewTraining(newTrainingList));

            const response = await dispatch(
                postTraining({
                    accessToken,
                    newTraining: newTrainingList,
                }),
            ).unwrap();

            if (response === RequestResult.success) {
                setIsSuccessCreateTraining(true);
                await dispatch(getTrainings({ accessToken }));
            } else {
                setIsErrorCreateTraining(true);
            }
        }

        onClose();
        await dispatch(getTrainings({ accessToken: accessToken }));
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
            setIsSaveButtonDisabled(false);
        } else {
            const updatedExercises = [...exercises];
            updatedExercises[exerciseIndex] = {
                ...updatedExercises[exerciseIndex],
                [field]: value,
            };
            setExercises(updatedExercises);
        }
    };

    const handleExerciseDelete = () => {
        const updatedExercises = editExercises.filter((exercise) => !exercise.isImplementation);
        setEditExercises(updatedExercises);
        const updatedTrainingData = generateUpdatedTrainingData(updatedTraining, updatedExercises);
        dispatch(saveUpdatedTraining(updatedTrainingData));
    };

    useEffect(() => {
        if (drawerState.isEditDrawer) {
            setIsSaveButtonDisabled(false);
        } else if (drawerState.isJoinTrainingDrawer) {
            !!selectedDate && !!exercises.length
                ? setIsSaveButtonDisabled(false)
                : setIsSaveButtonDisabled(true);
        } else {
            !!selectedTrainig && !!selectedDate
                ? setIsSaveButtonDisabled(false)
                : setIsSaveButtonDisabled(true);
        }
    }, [selectedTrainig, selectedDate, drawerState]);

    useEffect(() => {
        if (Number(width) && Number(width) < 700) {
            setIsDesktop(false);
        } else {
            setIsDesktop(true);
        }
    }, [width]);

    useEffect(() => {
        setIsRepeat(updatedTraining?.parameters?.repeat);
        setEditExercises(updatedTraining?.exercises);
    }, [updatedTraining]);

    return (
        <Drawer
            key={'right-menu'}
            width={380}
            data-test-id='modal-drawer-right'
            placement={isDesktop ? 'right' : 'bottom'}
            closable={false}
            onClose={onClose}
            destroyOnClose={true}
            open={
                drawerState.isTrainingsDrawer ||
                drawerState.isEditDrawer ||
                drawerState.isJoinTrainingDrawer
            }
            className={isDesktop ? '' : 'drawer-mobile'}
            mask={false}
            footer={
                drawerState.isJoinTrainingDrawer ? (
                    <Button
                        className={'button_save'}
                        disabled={isSaveButtonDisabled}
                        onClick={handleSendInvite}
                        type='primary'
                    >
                        Отправить приглашение
                    </Button>
                ) : (
                    <Button
                        className={'button_save'}
                        disabled={isSaveButtonDisabled}
                        onClick={handleSave}
                        type='primary'
                    >
                        Сохранить
                    </Button>
                )
            }
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
                            <div>
                                +{' '}
                                {drawerState.isJoinTrainingDrawer
                                    ? 'Совместная тренировка'
                                    : 'Добавление упражнений'}
                            </div>
                            <CloseOutlined
                                data-test-id='modal-drawer-right-button-close'
                                onClick={onClose}
                            />
                        </>
                    )}
                </div>
                <div className='trainings-drawer__info'></div>
                {drawerState.isJoinTrainingDrawer ? (
                    <div className='joint-training-user'>
                        <Avatar
                            size={42}
                            alt={joinTrainingUser?.name}
                            src={joinTrainingUser?.imageSrc}
                            icon={!joinTrainingUser?.imageSrc && <UserOutlined />}
                        />
                        <div>{joinTrainingUser?.name}</div>
                        <Badge
                            className={'joint-training-user__exercise'}
                            color={getTrainingsBadgeColor(joinTrainingUser?.trainingType || '')}
                            text={joinTrainingUser?.trainingType}
                        />
                    </div>
                ) : (
                    <Select
                        data-test-id='modal-create-exercise-select'
                        defaultValue={
                            drawerState.isEditDrawer
                                ? updatedTraining.name
                                : 'Выбор типа тренировки'
                        }
                        style={{ width: '100%' }}
                        options={trainingsList.map(({ name }) => ({
                            value: name,
                            label: name,
                            key: name,
                        }))}
                        onSelect={(value) => onSelect(value)}
                    />
                )}
                <div className='drawer__additional-options'>
                    <CustomDatePicker
                        defaultValue={drawerState.isEditDrawer ? updatedTraining.date : ''}
                        setSelectedDate={setSelectedDate}
                    />
                    <Checkbox
                        data-test-id='modal-drawer-right-checkbox-period'
                        defaultChecked={updatedTraining?.parameters?.repeat}
                        onChange={handleCheckboxChange}
                    >
                        С периодичностью
                    </Checkbox>
                </div>
                {isRepeat && (
                    <Select
                        data-test-id='modal-drawer-right-select-period'
                        defaultValue={
                            drawerState.isEditDrawer
                                ? getPeriodName(updatedTraining?.parameters?.period)
                                : 'Выбор типа тренировки'
                        }
                        style={{ width: '45%', paddingTop: '12px' }}
                        options={periodItems.map(({ item, period }) => ({
                            value: period,
                            label: item,
                            key: item,
                        }))}
                        onSelect={(value) => handleSelectPeriod(value)}
                    />
                )}
                {drawerState.isEditDrawer
                    ? editExercises.map((element, index) => (
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
                {!drawerState.isViewDrawer && !drawerState.isEditDrawer && (
                    <Button onClick={handleAddClick} className='trainings-drawer__button'>
                        + Добавить ещё{' '}
                    </Button>
                )}
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
                        >
                            - Удалить
                        </Button>
                    </div>
                )}
            </div>
        </Drawer>
    );
};
