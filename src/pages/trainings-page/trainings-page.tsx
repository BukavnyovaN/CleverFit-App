import { Alert, Badge, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import './trainings-page.css';
import { MyTrainings } from '@components/my-trainings/my-trainings.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { RightMenu } from '@pages/trainings-page/right-menu/right-menu.tsx';
import { getTrainingsList } from '@redux/actions/get-trainings-list.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { NotificationModal } from '@components/notification-modal/notification-modal.tsx';
import { JoinTrainings } from '@components/join-trainings';
import { invitesSelector } from '@utils/helpers/selectors.ts';
import { Marathons } from '@components/maraphons/marathons.tsx';
import { useWindowWidth } from '@hooks/use-window-width.ts';
import { TabsItems } from '../../types/tabs-items.type.ts';

const tabsItems: TabsItems[] = [
    {
        id: 'my-trainings',
        label: 'Мои тренировки',
        key: 'my-trainings',
        children: <MyTrainings />,
    },
    {
        label: 'Совместные тренировки',
        id: 'group-trainings',
        key: 'group-trainings',
        badgeCount: true,
        children: <JoinTrainings />,
    },
    {
        label: 'Марафоны',
        id: 'marathons',
        key: 'marathons',
        children: <Marathons />,
    },
];

export const TrainingsPage = () => {
    const dispatch = useAppDispatch();
    const { width } = useWindowWidth();
    const [isMobile, setIsMobile] = useState(false);
    const [, setCurrentTab] = useState('');
    const accessToken = useGetAccessToken();
    const [isErrorGettingTrainingsList, setIsErrorGettingTrainingsList] = useState(false);
    const [isErrorCreatingTraining, setIsErrorCreatingTraining] = useState(false);
    const [isSuccessUpdatingTraining, setIsSuccessUpdatingTraining] = useState(false);
    const [isSuccessCreatingTraining, setIsSuccessCreatingTraining] = useState(false);
    const invites = useAppSelector(invitesSelector);

    const getTrainingsNames = async () => {
        const response = await dispatch(getTrainingsList({ accessToken })).unwrap();
        if (response === RequestResult.error) {
            setIsErrorGettingTrainingsList(true);
        }
    };

    const onCloseModal = () => {
        setIsErrorGettingTrainingsList(false);
        setIsErrorGettingTrainingsList(false);
        setIsErrorCreatingTraining(false);
    };

    const onGetListHandler = async () => {
        await getTrainingsNames();
        setIsErrorGettingTrainingsList(false);
    };

    const currentTabHandler = (activeKey: string) => setCurrentTab(activeKey);

    useEffect(() => {
        getTrainingsNames();
    }, []);

    useEffect(() => {
        if (width < 400) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, [width]);

    return (
        <div className='trainings__wrapper'>
            <Tabs
                tabBarGutter={5}
                className='trainings__tabs'
                onChange={currentTabHandler}
                defaultActiveKey='1'
                items={tabsItems.map((tabItem) => {
                    return {
                        label:
                            tabItem.label === 'Совместные тренировки' ? (
                                <div>
                                    {tabItem.label}
                                    <Badge
                                        count={invites?.length}
                                        size={isMobile ? 'small' : 'default'}
                                    />
                                </div>
                            ) : (
                                tabItem.label
                            ),
                        key: tabItem.key,
                        children: tabItem.children,
                    };
                })}
            ></Tabs>
            <RightMenu
                setIsErrorCreateTraining={setIsErrorCreatingTraining}
                setIsSuccessCreateTraining={setIsSuccessCreatingTraining}
                setIsSuccessUpdateTraining={setIsSuccessUpdatingTraining}
            />
            <NotificationModal
                dataTestId={'modal-error-user-training-button'}
                textButton={isErrorCreatingTraining ? 'Закрыть' : 'Обновить'}
                onClickButton={isErrorGettingTrainingsList ? onGetListHandler : onCloseModal}
                isCloseIcon={true}
                title={
                    isErrorCreatingTraining
                        ? 'При сохранении данных произошла ошибка'
                        : 'При открытии данных произошла ошибка'
                }
                subtitle={
                    isErrorCreatingTraining ? 'Придётся попробовать ещё раз' : 'Попробуйте ещё раз.'
                }
                open={isErrorGettingTrainingsList || isErrorCreatingTraining}
                onClose={onCloseModal}
            />
            {isSuccessCreatingTraining && (
                <Alert
                    className='profile-form__alert'
                    message='Новая тренировка успешно добавлена'
                    type='success'
                    data-test-id='create-training-success-alert'
                    onClose={() => setIsSuccessCreatingTraining(false)}
                    showIcon
                    closable
                />
            )}
            {isSuccessUpdatingTraining && (
                <Alert
                    className='profile-form__alert'
                    message='Тренировка успешно обновлена'
                    data-test-id='create-training-success-alert'
                    type='success'
                    onClose={() => setIsSuccessUpdatingTraining(false)}
                    showIcon
                    closable
                />
            )}
        </div>
    );
};
