import React from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './enter-button.css';

type EnterButtonProps = {
    title: string;
    type: 'default' | 'primary';
    className: string;
    disabled: boolean;
    dataTestId: string;
    htmlType?: 'button' | 'submit' | 'reset';
};

export const EnterButton: React.FC<EnterButtonProps> = ({
    title,
    type,
    className,
    htmlType,
    disabled,
    dataTestId,
}) => (
    <Button
        className={className}
        block={true}
        type={type}
        disabled={disabled}
        htmlType={htmlType}
        icon={type === 'default' ? <GooglePlusOutlined /> : null}
        data-test-id={dataTestId}
    >
        {title}
    </Button>
);
