import React, { useEffect, useState } from 'react';
import { Form, Input } from 'antd';
import { EnterButton } from '@components/enter-button';

import './change-password-page.css';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { changePassword } from '@redux/actions/change-password.ts';
import { savePassword } from '@redux/slice/user/user-slice.ts';
import { Loader } from '@components/loader';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { FormInstance } from 'rc-field-form/lib/interface';
import {
    loadingSelector,
    passwordSelector,
    prevLocationsSelector,
} from '@utils/helpers/selectors.ts';
import { FormValues } from '../../types/form-values.type.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { validatePassword } from '@utils/validators/validate-password.function.ts';
import { validateConfirmPassword } from '@utils/validators/validate-confirm-password.function.ts';

export const ChangePasswordPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const password = useAppSelector(passwordSelector);
    const prevLocation = useAppSelector(prevLocationsSelector);
    const loading = useAppSelector(loadingSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const [passwordValid, setPasswordValid] = useState(false);
    const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const checkForErrors = () => {
        setDisabled(passwordValid && confirmPasswordValid);
    };

    useEffect(checkForErrors, [passwordValid, confirmPasswordValid]);

    const fetchChangePassword = async (password?: string, confirmPassword?: string) => {
        let url;
        const response = await dispatch(changePassword({ password, confirmPassword })).unwrap();

        response === RequestResult.success
            ? (url = PATHS.RESULT + PATHS.ROOT + PATHS.SUCCESS_CHANGE_PASSWORD)
            : (url = PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_CHANGE_PASSWORD);

        navigate(url, { state: location });
    };

    const onFinish = async (values: FormValues) => {
        const password = values.password;
        const confirmPassword = values.repeatPassword;
        await fetchChangePassword(password, confirmPassword);
        dispatch(savePassword(password));
    };

    useEffect(() => {
        if (
            prevLocation?.length &&
            prevLocation[1]?.location?.pathname ===
                PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_CHANGE_PASSWORD
        ) {
            fetchChangePassword(password, password);
        }
    }, [prevLocation]);

    return !!location.state?.pathname && !!prevLocation ? (
        <div className='change-password__page'>
            <div className='change-password__wrapper'>
                {loading && <Loader />}
                <div className='change-password__form'>
                    <Form
                        name='basic'
                        wrapperCol={{ span: 24 }}
                        key='registration-form'
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete='off'
                    >
                        <div className='change-password__title'>Восстановление аккаунта</div>
                        <Form.Item
                            name='password'
                            key='password'
                            initialValue={password}
                            rules={[
                                { required: true, message: '' },
                                ({ getFieldValue }: FormInstance) => ({
                                    async validator(_: any) {
                                        const value = getFieldValue('password');
                                        const isPasswordValid = validatePassword(value);
                                        if (isPasswordValid) {
                                            setPasswordValid(true);
                                            return;
                                        }
                                        setPasswordValid(false);
                                        throw new Error(
                                            'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                        );
                                    },
                                }),
                            ]}
                            help='Пароль не менее 8 латинских букв с заглавной и цифрой'
                        >
                            <Input.Password data-test-id='change-password' placeholder='Пароль' />
                        </Form.Item>

                        <Form.Item
                            className='input'
                            name='repeatPassword'
                            dependencies={['password']}
                            initialValue={password}
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                                ({ getFieldValue }: FormInstance) => ({
                                    async validator(_: any) {
                                        const value = getFieldValue('password');
                                        const confirmValue = getFieldValue('repeatPassword');
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
                                data-test-id='change-confirm-password'
                                placeholder='Повторите пароль'
                            />
                        </Form.Item>
                        <Form.Item className={'enter'}>
                            <EnterButton
                                disabled={!disabled}
                                className={'enter-button'}
                                htmlType={'submit'}
                                type='primary'
                                dataTestId='change-submit-button'
                                title={'Сохранить'}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    ) : (
        <Navigate to={'/auth'} />
    );
};
