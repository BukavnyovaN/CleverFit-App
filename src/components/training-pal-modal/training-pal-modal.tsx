import { JoinTrainingUser, saveTrainingPals } from '@redux/slice/trainings/trainings-slice.ts';
import { Avatar, Button, Col, Modal, Row } from 'antd';
import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import './training-pal-modal.css';
import { putInvite } from '@redux/actions/put-invite.ts';
import { InviteStatus } from '../../enums/invite-status.enum.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { getJoinTrainingUsers } from '@redux/actions/get-join-training-user.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingPals } from '@redux/actions/get-training-pals.ts';
import { trainingsPalsSelector } from '@utils/helpers/selectors.ts';
import { updateTrainingPals } from '@utils/helpers/update-training-pals.ts';

type TrainingPalModalProps = {
    onClose: ((e: MouseEvent) => void) | undefined;
    open: boolean;
    partner: JoinTrainingUser;
};

export const TrainingPalModal = ({ open, onClose, partner }: TrainingPalModalProps) => {
    const accessToken = useGetAccessToken();
    const dispatch = useAppDispatch();
    const trainingPals = useAppSelector(trainingsPalsSelector);

    const handleRejectInvite = async (id: string) => {
        const response = await dispatch(
            putInvite({ accessToken: accessToken, id: id, status: InviteStatus.rejected }),
        ).unwrap();
        if (response === RequestResult.success) {
            const updatedTrainingPals = updateTrainingPals(trainingPals, id);
            dispatch(saveTrainingPals(updatedTrainingPals));
            await dispatch(getJoinTrainingUsers({ accessToken: accessToken }));
            await dispatch(getTrainingPals({ accessToken: accessToken }));
        }
        onClose();
    };

    return (
        <Modal
            data-test-id='partner-modal'
            className='training-pal-modal'
            style={{ padding: 0 }}
            open={open}
            centered={true}
            onCancel={onClose}
            footer={null}
            maskStyle={{ backdropFilter: 'blur(5px)', background: 'rgba(121, 156, 212, 0.5)' }}
        >
            <>
                <Row className='training-pal__info'>
                    <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            size={42}
                            alt={partner.name}
                            src={partner.imageSrc}
                            icon={!partner.imageSrc && <UserOutlined />}
                        />
                        <div className='training-pal__name'>{partner?.name}</div>
                    </Col>
                    <Col sm={{ span: 12 }} xs={{ span: 24 }} className='training-pal__training'>
                        <Col span={12} className='training-pal__info-names'>
                            <div>Тип тренировки:</div>
                            <div>Средняя нагрузка:</div>
                        </Col>
                        <Col span={12} className='training-pal__info-data'>
                            <div>{partner.trainingType}</div>
                            <div>{partner.avgWeightInWeek} кг/нед</div>
                        </Col>
                    </Col>
                </Row>
                <Row className='training-pal__actions'>
                    <Col sm={{ span: 12 }} xs={{ span: 24 }} className='training-pal__status'>
                        тренировка одобрена
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                    </Col>
                    <Col sm={{ span: 12 }} xs={{ span: 24 }} style={{ width: '100%' }}>
                        <Button
                            size='middle'
                            block={true}
                            onClick={() => handleRejectInvite(partner.inviteId)}
                        >
                            Отменить тренировку
                        </Button>
                    </Col>
                </Row>
            </>
        </Modal>
    );
};
