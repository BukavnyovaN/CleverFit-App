import React, { ReactNode } from 'react';
import { IdcardOutlined, HeartFilled, CalendarTwoTone } from '@ant-design/icons';
import { Card } from 'antd';

import './card-item.css';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { getTrainings } from '@redux/actions/get-trainings.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';

type ProfileCardProps = {
    title: string;
    icon: 'IdcardOutlined' | 'HeartFilled' | 'CalendarTwoTone';
    iconColor: string;
    buttonText: string;
    buttonLink: string;
    dataTestId?: string;
};

export const CardItem: React.FC<ProfileCardProps> = ({
    title,
    icon,
    iconColor,
    buttonText,
    buttonLink,
    dataTestId,
}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const accessToken = useGetAccessToken();

    const selectedIcon: ReactNode = {
        IdcardOutlined: <IdcardOutlined />,
        HeartFilled: <HeartFilled />,
        CalendarTwoTone: <CalendarTwoTone />,
    }[icon];

    const cardAction = async (menuItemPath: string) => {
        if (menuItemPath === PATHS.CALENDAR || menuItemPath === PATHS.TRAININGS) {
            const response = await dispatch(getTrainings({ accessToken })).unwrap();
            response === RequestResult.success ? navigate(menuItemPath) : navigate(PATHS.MAIN);
        } else if (menuItemPath === PATHS.PROFILE) {
            navigate(PATHS.PROFILE);
        } else {
            navigate(PATHS.MAIN);
        }
    };

    return (
        <Card
            headStyle={{ fontWeight: 400, lineHeight: 1.3 }}
            bodyStyle={{ padding: '16px 0px' }}
            title={title}
            style={{ borderRadius: '2px', textAlign: 'center' }}
        >
            <div data-test-id={dataTestId} onClick={() => cardAction(buttonLink)}>
                {selectedIcon && React.cloneElement(selectedIcon, { style: { color: iconColor } })}
                <span className='card__button'>{buttonText}</span>
            </div>
        </Card>
    );
};
