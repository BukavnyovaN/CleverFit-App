import { Badge, Button, Card } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { JoinTraining } from '@redux/slice/trainings/trainings-slice.ts';
import { getTrainingsBadgeColor } from '@utils/helpers/get-training-bage-color.ts';
import { getPeriodOptionByNumber } from '@utils/helpers/get-period-option-by-number.ts';
import { formatDate } from '@utils/helpers/format-date-to-iso-string.ts';
import './invite-training-info.css';

type InviteTrainingInfoProps = {
    joinTraining: JoinTraining;
    onClose: VoidFunction;
};

export const InviteTrainingInfo = ({ joinTraining, onClose }: InviteTrainingInfoProps) => (
    <Card className='invite-trining-info__card' data-test-id='joint-training-review-card'>
        <div className='invite-trining-info__wrapper'>
            <div className='invite-trining-info__title'>
                <div className='invite-trining-info__title-wrapper'>
                    <Badge color={getTrainingsBadgeColor(joinTraining?.training.name)} />
                    <div>{joinTraining?.training.name}</div>
                </div>
                <Button type='text' size='small' icon={<CloseOutlined />} onClick={onClose} />
            </div>
            <div className='invite-trining-info__body'>
                {joinTraining.training.parameters?.period && (
                    <div className='invite-trining-info__date'>
                        <div
                            style={{
                                fontSize: 'var(--font-size-sm)',
                                fontWeight: 'var(--font-weight-bold)',
                            }}
                        >
                            {getPeriodOptionByNumber(joinTraining.training.parameters?.period)}
                        </div>
                        <div>{formatDate(joinTraining.training.date)}</div>
                    </div>
                )}

                {joinTraining?.training.exercises?.map((exercise) => (
                    <div className='invite-trining-info__exercise' style={{ marginTop: '8px' }}>
                        <div className='invite-trining-info__name'>{exercise.name}</div>
                        <div className='invite-trining-info__approaches'>
                            {`${exercise.approaches} x (${exercise.replays})`}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Card>
);
