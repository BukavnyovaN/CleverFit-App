import { Form, Input } from 'antd';
import { LoginInput } from '@components/login-input';
import { PasswordInput } from '@components/password-input';
import { FormInstance } from 'rc-field-form/lib/interface';
import { validatePassword } from '@utils/validators/validate-password.function.ts';
import { validateConfirmPassword } from '@utils/validators/validate-confirm-password.function.ts';
import { Dispatch, SetStateAction } from 'react';
import './credentials-form-item.css';
import { validateEmail } from '@utils/validators/validate-email.function.ts';

type CredentialsFormProps = {
    setIsButtonDisabled: Dispatch<SetStateAction<boolean>>;
};

export const CredentialsFormItem = ({ setIsButtonDisabled }: CredentialsFormProps) => {
    const ruleForValidatingEmail = [
        { required: true, message: '' },
        ({ getFieldValue }: FormInstance) => ({
            async validator() {
                const value = getFieldValue('username');

                const isValid = validateEmail(value);

                if (isValid) {
                    return;
                }
                throw new Error('');
            },
        }),
    ];

    const rulesForValidatingPassword = [
        { required: false, message: '' },
        ({ getFieldValue }: FormInstance) => ({
            async validator() {
                setIsButtonDisabled(false);
                const value = getFieldValue('password');
                if (value) {
                    const isPasswordValid = validatePassword(value);
                    if (isPasswordValid) {
                        return;
                    }
                    setIsButtonDisabled(true);
                    throw new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой');
                }
            },
        }),
    ];

    return (
        <div className='profile-form__credentials-inputs'>
            <LoginInput rules={ruleForValidatingEmail} dataTestId={'profile-email'} />
            <PasswordInput
                name='password'
                key='profile-password'
                helpMessage='Пароль не менее 8 латинских букв с заглавной и цифрой'
                placeholder='Пароль'
                dependencies={[]}
                rules={rulesForValidatingPassword}
                dataTestId='profile-password'
            />
            <Form.Item
                className='input'
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    {
                        required: false,
                    },
                    ({ getFieldValue }: FormInstance) => ({
                        async validator() {
                            const value = getFieldValue('password');
                            if (value) {
                                const confirmValue = getFieldValue('confirmPassword');
                                const isConfirmPasswordValid = validateConfirmPassword(
                                    value,
                                    confirmValue,
                                );
                                if (isConfirmPasswordValid) {
                                    return;
                                }
                                throw new Error('Пароли не совпадают');
                            }
                        },
                    }),
                ]}
            >
                <Input.Password
                    data-test-id='profile-repeat-password'
                    placeholder='Повторите пароль'
                />
            </Form.Item>
        </div>
    );
};
