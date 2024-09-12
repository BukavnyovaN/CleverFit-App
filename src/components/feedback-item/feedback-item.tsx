import { Avatar, Card, Rate } from 'antd';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Nullable } from "../../types/nullable.type.ts";

import './feedback-item.css';


type FeedbackItemProps = {
    rating: number;
    createdAt: string;
    key: Nullable<string>;
    id?: Nullable<string>;
    fullName?: Nullable<string>;
    imageSrc?: Nullable<string>;
    message?: Nullable<string>;
};

export const FeedbackItem = ({
    fullName,
    imageSrc,
    message,
    rating,
    createdAt,
}: FeedbackItemProps) => {
    const [firstName, lastName] = (fullName || '').split(' ');
    const createdDate = createdAt && new Date(createdAt).toLocaleDateString();

    return (
        <Card className='feedback-item__card-wrapper' bordered={false}>
            <div className='feedback-item__card'>
                <div className='feedback-item__user'>
                    <Avatar size={42} src={imageSrc} icon={imageSrc ? '' : <UserOutlined />} />
                    <div>
                        <h6 className='feedback-item__firstname'>{firstName || 'Пользователь'}</h6>
                        <h6 className='feedback-item__lastname'>{lastName || ''}</h6>
                    </div>
                </div>
                <div className='feedback-item__content'>
                    <div className='feedback-item__rating'>
                        <Rate
                            style={{ color: '#faad14' }}
                            className='feedback-item__rate'
                            disabled={true}
                            defaultValue={rating}
                            character={({ value, index }) => {
                                return value && index! < value ? (
                                    <StarFilled style={{ color: '#faad14' }} />
                                ) : (
                                    <StarOutlined style={{ color: '#faad14' }} />
                                );
                            }}
                        />
                        <span className='feedback-item__date'>{createdDate}</span>
                    </div>
                    <div className='feedback-item__text'>{message}</div>
                </div>
            </div>
        </Card>
    );
};
