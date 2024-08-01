import { Button, Divider } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import './join-trainings.css';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingPals } from '@redux/actions/get-training-pals.ts';
import { TrainingPals } from '@components/training-pals/training-pals.tsx';
import { joinUsersSelector, trainingsData } from '@utils/helpers/selectors.ts';
import { getMostPopularTraining } from '@utils/helpers/get-most-popular-training.ts';
import { getJoinTrainingUsers } from '@redux/actions/get-join-training-user.ts';
import { JoinTrainingUserList } from '@components/join-training-user-list';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { NotificationModal } from '@components/notification-modal/notification-modal.tsx';
import { getInvites } from '@redux/actions/get-invites.ts';
import { InviteList } from '@components/invite-list/invite-list.tsx';

export const JoinTrainings = () => {
    const accessToken = useGetAccessToken();
    const dispatch = useAppDispatch();
    const trainings = useAppSelector(trainingsData);
    const joinTrainingUsers = useAppSelector(joinUsersSelector);
    const [showJoinList, setShowJoinList] = useState(false);
    const [showPalsList, setShowPalsList] = useState(false);
    const [isErrorGettingUserByMostPopularTraining, setIsErrorGettingUserByMostPopularTraining] =
        useState(false);
    const [isJoinTrainingUserRandom, setIsJoinTrainingUserRandom] = useState(false);

    const getJoinTrainingsUserByMostPopularTraining = async () => {
        const trainingType = getMostPopularTraining(trainings);
        const response = await dispatch(
            getJoinTrainingUsers({ accessToken: accessToken, trainingType: trainingType }),
        ).unwrap();

        if (response === RequestResult.error) {
            setIsErrorGettingUserByMostPopularTraining(true);
            return;
        }
        setIsErrorGettingUserByMostPopularTraining(false);
        setShowJoinList(true);
    };

    const getJoinTrainingUserRandom = async () => {
        const response = await dispatch(
            getJoinTrainingUsers({ accessToken: accessToken }),
        ).unwrap();

        if (response === RequestResult.error) {
            setIsJoinTrainingUserRandom(true);
            return;
        }
        setIsJoinTrainingUserRandom(false);
        setShowJoinList(true);
    };

    useEffect(() => {
        dispatch(getInvites({ accessToken: accessToken }));
        dispatch(getTrainingPals({ accessToken: accessToken }));
    }, []);

    if (joinTrainingUsers && showJoinList) {
        return <JoinTrainingUserList handleBack={setShowJoinList} />;
    }

    if (showPalsList) {
        return <TrainingPals showBackButton={true} onBack={setShowPalsList} elem='training-pals' />;
    }

    const handleButtonClick = async () => {
        if (isJoinTrainingUserRandom) {
            setIsJoinTrainingUserRandom(false);
            await getJoinTrainingUserRandom();
        }

        if (isErrorGettingUserByMostPopularTraining) {
            setIsErrorGettingUserByMostPopularTraining(false);
            await getJoinTrainingsUserByMostPopularTraining();
        }
    };

    const handleClose = () => {
        setIsJoinTrainingUserRandom(false);
        setIsErrorGettingUserByMostPopularTraining(false);
    };

    return (
        <div className='join-trainings__wrapper'>
            <InviteList setShowPalsList={setShowPalsList} />
            <div>
                <div className='join-trainings__content'>
                    <div className='join-trainings__title'>
                        Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br /> Можешь
                        найти друга для совместных тренировок среди других пользователей.
                    </div>
                    <div className='join-trainings__description'>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </div>
                    <Divider />
                    <ButtonGroup className='join-trainings__buttongroup'>
                        <Button
                            type='text'
                            style={{ color: '#2f54eb' }}
                            onClick={getJoinTrainingUserRandom}
                        >
                            Случайный выбор
                        </Button>
                        <Button onClick={getJoinTrainingsUserByMostPopularTraining} type='text'>
                            Выбор друга по моим тренировкам
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
            <TrainingPals elem={'training-pals'} />
            <NotificationModal
                dataTestId={'modal-error-user-training-button'}
                textButton={'Обновить'}
                onClickButton={handleButtonClick}
                isCloseIcon={true}
                title={'При открытии данных произошла ошибка'}
                subtitle={'Попробуйте ещё раз.'}
                open={isErrorGettingUserByMostPopularTraining || isJoinTrainingUserRandom}
                onClose={handleClose}
            />
        </div>
    );
};
