import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

import './result-message.css';
import { ResultStatusType } from 'antd/es/result';

type ResultMessageProps = {
    title: string;
    subTitle: string;
    buttonContent: string;
    navigateTo: string;
    location: any;
    dataTestId: string;
    status?: ResultStatusType;
};
export const ResultMessage: React.FC<ResultMessageProps> = ({
    status,
    title,
    subTitle,
    buttonContent,
    navigateTo,
    location,
    dataTestId,
}) => {
    const navigate = useNavigate();
    return (
        <div className='result-message'>
            <Result
                status={status}
                title={title}
                subTitle={subTitle}
                extra={
                    <Button
                        type='primary'
                        onClick={() => navigate(navigateTo, { state: location })}
                        data-test-id={dataTestId}
                    >
                        {buttonContent}
                    </Button>
                }
            />
        </div>
    );
};
