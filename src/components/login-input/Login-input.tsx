import React from 'react';
import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { emailSelector } from '@utils/helpers/selectors.ts';

type LoginInputProps = {
    rules: Rule[];
    dataTestId: string;
};

export const LoginInput: React.FC<LoginInputProps> = ({ rules, dataTestId }) => {
    const email = useAppSelector(emailSelector);

    return (
        <Form.Item className={'input'} name='username' rules={rules} initialValue={email}>
            <Input data-test-id={dataTestId} addonBefore='e-mail:' />
        </Form.Item>
    );
};
