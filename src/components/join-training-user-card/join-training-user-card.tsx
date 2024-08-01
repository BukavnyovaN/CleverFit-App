import { Avatar, Button, Card, Col, Row, Tooltip } from 'antd';
import { CheckCircleFilled, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import { JoinTrainingUser, saveJoinTrainingUser } from '@redux/slice/trainings/trainings-slice.ts';
import { Statuses } from '@constants/statuses.ts';
import { STATUS_INFO } from '../../enums/status-info.enum.ts';
import classNames from 'classnames';
import './join-training-user-card.css';
import { HighlightSearchValue } from '@utils/helpers/highlight-search-value.tsx';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { openJoinTrainingsDrawer } from '@redux/slice/app/app-slice.ts';
import { trainingsPalsSelector } from '@utils/helpers/selectors.ts';
import { putInvite } from '@redux/actions/put-invite.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { InviteStatus } from '../../enums/invite-status.enum.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { getJoinTrainingUsers } from '@redux/actions/get-join-training-user.ts';

type JoinTrainingUserCardProps = {
    user: JoinTrainingUser;
    elem: string;
    searchValue?: string;
    setSelectedPal?: (pal: JoinTrainingUser) => void;
    dataTestId?: string;
};

export const JoinTrainingUserCard = ({
    user,
    elem,
    searchValue,
    setSelectedPal,
    dataTestId,
}: JoinTrainingUserCardProps) => {
    const dispatch = useAppDispatch();
    const trainingPals = useAppSelector(trainingsPalsSelector);
    const accessToken = useGetAccessToken();
    const createJoinTraining = (trainingPal: JoinTrainingUser) => {
        dispatch(saveJoinTrainingUser(trainingPal));
        dispatch(openJoinTrainingsDrawer(true));
    };

    const handleRejectTraining = async (inviteId: string) => {
        const response = await dispatch(
            putInvite({ accessToken: accessToken, id: inviteId, status: InviteStatus.rejected }),
        ).unwrap();
        if (response === RequestResult.success) {
            await dispatch(getJoinTrainingUsers({ accessToken: accessToken }));
        }
    };

    const handleSelectedPal = () => {
        setSelectedPal?.(user);
    };

    return (
        <Card
            data-test-id={dataTestId}
            key={user.id}
            className={classNames(
                'user-card',
                elem === 'join-training-users-list' && 'user-card__blue',
                user.status === Statuses.REJECTED && 'user-card__gray',
            )}
            onClick={handleSelectedPal}
        >
            <div>
                <Row className='user-card__info'>
                    <Col>
                        <Avatar
                            size={42}
                            alt={user.name}
                            src={user.imageSrc}
                            icon={!user.imageSrc && <UserOutlined />}
                        />
                    </Col>
                    <Col style={{ marginLeft: '8px' }}>
                        <div style={{ width: '50px' }}>
                            {<HighlightSearchValue searchValue={searchValue} name={user.name} />}
                        </div>
                    </Col>
                </Row>
                <Row className='user-card__indicators'>
                    <Col span={15} className='user-card__indInfo'>
                        <div>Тип тренировки:</div>
                        <div style={{ marginTop: '4px' }}>Средняя нагрузка:</div>
                    </Col>
                    <Col span={9} className='user-card__training'>
                        <div>{user.trainingType}</div>
                        <div style={{ marginTop: 'var(--padding-xx-sm)' }}>
                            {user.avgWeightInWeek} кг/нед
                        </div>
                    </Col>
                </Row>
                {elem === 'join-training-users-list' && (
                    <>
                        {user.status === null ? (
                            <Button
                                block={true}
                                size='middle'
                                type='primary'
                                onClick={() => createJoinTraining(user)}
                                style={{ marginTop: '16px' }}
                                disabled={trainingPals?.length >= 4}
                            >
                                Создать тренировку
                            </Button>
                        ) : (
                            <Button
                                block={true}
                                size='middle'
                                type={user.status === Statuses.ACCEPTED ? 'default' : 'primary'}
                                onClick={() => handleRejectTraining(user.inviteId)}
                                style={{ marginTop: '16px' }}
                                disabled={
                                    user.status === Statuses.REJECTED ||
                                    user.status === Statuses.PENDING
                                }
                            >
                                {user.status === Statuses.ACCEPTED
                                    ? 'Отменить тренировку'
                                    : 'Создать тренировку'}
                            </Button>
                        )}
                        {user.status && (
                            <div className='user-card__statuses'>
                                {STATUS_INFO[user.status as keyof typeof STATUS_INFO]}
                                {user.status === Statuses.REJECTED && (
                                    <Tooltip
                                        placement='topRight'
                                        overlayStyle={{ width: '150px' }}
                                        title='повторный запрос будет доступнен
                                    через 2 недели'
                                    >
                                        <InfoCircleOutlined />
                                    </Tooltip>
                                )}
                                {user.status === Statuses.ACCEPTED && (
                                    <CheckCircleFilled style={{ color: '#52c41a' }} />
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </Card>
    );
};
