import { useEffect, useState } from 'react';
import { Form, Input } from 'antd';

import { LoginInput } from '@components/login-input';
import { PasswordInput } from '@components/password-input';
import { EnterButton } from '@components/enter-button';

import './registration-form.css';
import { EnterViaGoogleButton } from '@components/enter-via-google-button';
import { registerUser } from '@redux/actions/register.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { logout, saveEmail, savePassword } from '@redux/slice/user/user-slice.ts';
import { FormInstance } from 'rc-field-form/lib/interface';
import {
    emailSelector,
    passwordSelector,
    prevLocationsSelector,
} from '@utils/helpers/selectors.ts';
import { FormValues } from '../../types/form-values.type.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { validateEmail } from '@utils/validators/validate-email.function.ts';
import { validatePassword } from '@utils/validators/validate-password.function.ts';
import { validateConfirmPassword } from '@utils/validators/validate-confirm-password.function.ts';

export const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const [disabled, setDisabled] = useState(true);
    const [emailValid, setEmailValidation] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const prevLocation = useAppSelector(prevLocationsSelector);
    const password = useAppSelector(passwordSelector);
    const email = useAppSelector(emailSelector);

    useEffect(() => {
        if (
            prevLocation?.length &&
            prevLocation[1]?.location?.pathname === PATHS.RESULT + PATHS.ROOT + PATHS.ERROR
        ) {
            fetchData(email, password);
        }
    }, [prevLocation]);

    const checkForErrors = () => {
        setDisabled(emailValid && passwordValid && confirmPasswordValid);
    };

    const ruleForValidatingEmail = [
        { required: true, message: '' },
        ({ getFieldValue }: FormInstance) => ({
            async validator() {
                const value = getFieldValue('username');
                const isEmailValid = validateEmail(value);
                if (isEmailValid) {
                    dispatch(saveEmail(value));
                    setEmailValidation(true);

                    return;
                }
                setEmailValidation(false);
                throw new Error('');
            },
        }),
    ];

    const rulesForValidatingPassword = [
        { required: true, message: '' },
        ({ getFieldValue }: FormInstance) => ({
            async validator() {
                const value = getFieldValue('password');

                const isPasswordValid = validatePassword(value);
                if (isPasswordValid) {
                    dispatch(savePassword(getFieldValue('password')));
                    setPasswordValid(true);

                    return;
                }

                setPasswordValid(false);

                throw new Error('Пароль не менее 8 символов, с заглавной буквой и цифрой');
            },
        }),
    ];

    useEffect(checkForErrors, [emailValid, passwordValid, confirmPasswordValid]);

    const fetchData = async (email?: string, password?: string) => {
        const response = await dispatch(registerUser({ email, password })).unwrap();
        let url = PATHS.RESULT + PATHS.ROOT + PATHS.SUCCESS;

        if (response === RequestResult.user_exists) {
            url = PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_USER_EXISTS;
        } else if (response === RequestResult.error) {
            url = PATHS.RESULT + PATHS.ROOT + PATHS.ERROR;
        }
        dispatch(logout());
        navigate(url, { state: location });
    };
    const onFinish = async (values: FormValues) => {
        const { username, password } = values;
        await fetchData(username, password);
    };

    return (
        <Form
            name='basic'
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 368 }}
            key='registration-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete='off'
        >
            <LoginInput dataTestId='registration-email' rules={ruleForValidatingEmail} />
            <PasswordInput
                name='password'
                key='password'
                helpMessage='Пароль не менее 8 латинских букв с заглавной и цифрой'
                placeholder='Пароль'
                dependencies={[]}
                rules={rulesForValidatingPassword}
                dataTestId='registration-password'
            />
            <Form.Item
                className='input'
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    ({ getFieldValue }: FormInstance) => ({
                        async validator(_: any) {
                            const value = getFieldValue('password');
                            const confirmValue = getFieldValue('confirmPassword');
                            const isConfirmPasswordValid = validateConfirmPassword(
                                value,
                                confirmValue,
                            );

                            if (isConfirmPasswordValid) {
                                setConfirmPasswordValid(true);
                                return;
                            }

                            setConfirmPasswordValid(false);
                            throw new Error('Пароли не совпадают');
                        },
                    }),
                ]}
            >
                <Input.Password
                    data-test-id='registration-confirm-password'
                    placeholder='Повторите пароль'
                />
            </Form.Item>
            <Form.Item className={'enter'}>
                <EnterButton
                    dataTestId='registration-submit-button'
                    disabled={!disabled}
                    className={'enter-button'}
                    htmlType={'submit'}
                    type='primary'
                    title={'Войти'}
                />
            </Form.Item>
            <Form.Item className={'enter-via-google'}>
                <EnterViaGoogleButton title={'Войти через Google'} />
            </Form.Item>
        </Form>
    );
};
