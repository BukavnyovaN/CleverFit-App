import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { invitesSelector } from '@utils/helpers/selectors.ts';
import { Avatar, Button } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { Dispatch, SetStateAction, useState } from 'react';
import { formatDate } from '@utils/helpers/format-date-to-iso-string.ts';
import './invite-list.css';
import { TrainingInfoEnum } from '../../enums/training-info.enum.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { putInvite } from '@redux/actions/put-invite.ts';
import { InviteStatus } from '../../enums/invite-status.enum.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { InviteTrainingInfo } from '@components/invite-training-info/invite-training-info.tsx';
import { getTrainingPals } from '@redux/actions/get-training-pals.ts';
import { removeInvite } from '@utils/helpers/update-inivite-list.ts';
import { saveInvites } from '@redux/slice/trainings/trainings-slice.ts';

export const InviteList = ({
    setShowPalsList,
}: {
    setShowPalsList: Dispatch<SetStateAction<boolean>>;
}) => {
    const inviteList = useAppSelector(invitesSelector) || [];
    const [openInviteTrainingInfo, setOpenInviteTrainingInfo] = useState(false);
    const [selectedInviteId, setSelectedInviteId] = useState('');
    const [collapsed, setCollapsed] = useState(true);
    const inviteListToRender = collapsed ? [inviteList[0]] : inviteList;
    const dispatch = useAppDispatch();
    const accessToken = useGetAccessToken();

    const acceptInviteHandler = async (id: string) => {
        const response = await dispatch(
            putInvite({ accessToken: accessToken, id: id, status: InviteStatus.accepted }),
        ).unwrap();

        if (response === RequestResult.success) {
            const updatedInviteList = removeInvite(inviteList, id);
            dispatch(saveInvites(updatedInviteList));
            dispatch(getTrainingPals({ accessToken }));
            setShowPalsList(true);
        }
    };

    const rejectInviteHandler = async (id: string) => {
        const response = await dispatch(
            putInvite({ accessToken: accessToken, id: id, status: InviteStatus.rejected }),
        ).unwrap();

        if (response === RequestResult.success) {
            const updatedInviteList = removeInvite(inviteList, id);
            dispatch(saveInvites(updatedInviteList));
            dispatch(getTrainingPals({ accessToken }));
        }
    };

    const handleOpenInviteTrainingInfo = (id: string) => {
        setSelectedInviteId(id);
        setOpenInviteTrainingInfo(true);
    };

    if (!inviteList?.length) {
        return null;
    }

    const collapseHandler = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className='invite-list'>
            <div className='invite-list__messages'>Новое сообщение({inviteList.length})</div>
            {inviteListToRender?.map((item) => (
                <div className='invite-list__card' key={item._id}>
                    <div className='invite-list__user'>
                        <Avatar
                            size={42}
                            alt={item?.from?.firstName || undefined}
                            src={item.from.imageSrc}
                            icon={<UserOutlined />}
                        />
                        <div className='invite-list__user-name'>
                            <div>{item.from.firstName}</div>
                            <div>{item.from.lastName}</div>
                        </div>
                    </div>
                    <div className='invite-list__message'>
                        <div className='invite-list__date'>{formatDate(item.createdAt)}</div>
                        <div className='invite-list__info'>
                            Привет, я ищу партнёра для совместных{' '}
                            {TrainingInfoEnum[item.training.name as keyof typeof TrainingInfoEnum]}.
                            Ты хочешь присоединиться ко мне на следующих тренировках?
                        </div>
                        <div
                            className='invite-list__details'
                            onClick={() => handleOpenInviteTrainingInfo(item._id)}
                        >
                            Посмотреть детали тренировки
                        </div>
                        {openInviteTrainingInfo && selectedInviteId === item._id && (
                            <InviteTrainingInfo
                                joinTraining={item}
                                onClose={() => setOpenInviteTrainingInfo(false)}
                            />
                        )}
                    </div>
                    <div className='invite-list__buttons'>
                        <Button
                            className='invite-list__button'
                            type='primary'
                            onClick={() => acceptInviteHandler(item._id)}
                        >
                            Тренироваться вместе
                        </Button>
                        <Button
                            className='invite-list__button'
                            onClick={() => rejectInviteHandler(item._id)}
                        >
                            Отклонить запрос
                        </Button>
                    </div>
                </div>
            ))}

            {inviteList?.length > 1 && (
                <Button
                    className='invite-list__collapse'
                    type='text'
                    ghost={true}
                    icon={collapsed ? <DownOutlined /> : <UpOutlined />}
                    onClick={collapseHandler}
                >
                    {collapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};
