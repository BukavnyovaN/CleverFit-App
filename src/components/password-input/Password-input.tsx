import React from 'react';
import { Form, Input } from 'antd';
import { Rule } from 'antd/es/form';

import './password-input.css';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { passwordSelector } from '@utils/helpers/selectors.ts';

type PasswordInputProps = {
    placeholder: string;
    name: string;
    dependencies: string[];
    helpMessage?: string;
    rules: Rule[];
    key: string;
    dataTestId: string;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
    placeholder,
    name,
    dependencies,
    helpMessage,
    rules,
    dataTestId,
}) => {
    const password = useAppSelector(passwordSelector);

    return (
        <Form.Item
            className='input'
            name={name}
            dependencies={dependencies}
            rules={rules}
            help={helpMessage}
            initialValue={password}
        >
            <Input.Password data-test-id={dataTestId} placeholder={placeholder} />
        </Form.Item>
    );
};
