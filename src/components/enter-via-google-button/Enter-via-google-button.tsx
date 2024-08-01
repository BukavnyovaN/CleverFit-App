import React from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './enter-via-google-button.css';
import { ENDPOINTS } from '@constants/endpoints.ts';

type EnterButtonProps = {
    title: string;
};

export const EnterViaGoogleButton: React.FC<EnterButtonProps> = ({ title }) => (
    <a className='enter-via-google__wrapper' href={ENDPOINTS.BASE_URL + ENDPOINTS.GOOGLE_AUTH}>
        <Button
            className='enter-via-google-button'
            block={true}
            type='default'
            htmlType='button'
            icon={<GooglePlusOutlined />}
        >
            {title}
        </Button>
    </a>
);
