import { useEffect, useState } from 'react';
import { Form, Checkbox, Button } from 'antd';

import { LoginInput } from '@components/login-input';
import { PasswordInput } from '@components/password-input';
import { EnterButton } from '@components/enter-button';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';

import './login-form.css';
import { EnterViaGoogleButton } from '@components/enter-via-google-button';
import { loginUser } from '@redux/actions/login.ts';
import { checkEmail } from '@redux/actions/check-email.ts';
import { PATHS } from '@constants/paths.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormInstance } from 'rc-field-form/lib/interface';
import { prevLocationsSelector } from '@utils/helpers/selectors.ts';
import { FormValues } from '../../types/form-values.type.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { validatePassword } from '@utils/validators/validate-password.function.ts';
import { validateEmail } from '@utils/validators/validate-email.function.ts';

export const LoginForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isEmailValid, setIsEmailValid] = useState(false);
    const dispatch = useAppDispatch();
    let email = '';
    const prevLocation = useAppSelector(prevLocationsSelector);

    const fetchUser = async (email?: string, password?: string, checked?: boolean) => {
        let url;
        const response = await dispatch(loginUser({ email, password, checked })).unwrap();

        response === RequestResult.success
            ? (url = PATHS.MAIN)
            : (url = PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_LOGIN);

        navigate(url, { state: location });
    };

    const fetchCheckUserEmail = async (email: string) => {
        const result = await dispatch(checkEmail({ email })).unwrap();
        let url = PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_EMAIL;

        if (result === RequestResult.success) {
            url = PATHS.CONFIRM_EMAIL;
        } else if (result === RequestResult.not_found) {
            url = PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_EMAIL_NO_EXISTS;
        }

        navigate(url, { state: location });
    };

    useEffect(() => {
        if (
            prevLocation?.length &&
            prevLocation[1]?.location?.pathname === PATHS.RESULT + PATHS.ROOT + PATHS.ERROR_EMAIL
        ) {
            fetchCheckUserEmail(email);
        }
    }, [prevLocation]);

    const ruleForValidatingEmail = [
        { required: true, message: '' },
        ({ getFieldValue }: FormInstance) => ({
            async validator(_: any) {
                const value = getFieldValue('username');

                const isValid = validateEmail(value);

                if (isValid) {
                    email = value;
                    setIsEmailValid(true);
                    return;
                }

                setIsEmailValid(false);
                throw new Error('');
            },
        }),
    ];

    const rulesForValidatingPassword = [
        { required: true, message: '' },
        ({ getFieldValue }: FormInstance) => ({
            async validator(_: any) {
                const value = getFieldValue('password');
                const isPasswordValid = validatePassword(value);

                if (isPasswordValid) {
                    return;
                }

                throw new Error('');
            },
        }),
    ];

    const onFinish = async (values: FormValues) => {
        await fetchUser(values.username, values.password, values.remember);
    };

    const checkUserEmail = async () => {
        if (isEmailValid) {
            await fetchCheckUserEmail(email);
        }
    };

    return (
        <Form
            className='login-form'
            name='basic'
            key='login-form'
            wrapperCol={{ span: 24 }}
            style={{ maxWidth: 368 }}
            onFinish={onFinish}
            autoComplete='off'
        >
            <LoginInput
                dataTestId='login-email'
                rules={ruleForValidatingEmail}
                key={'login-input'}
            />
            <PasswordInput
                name='password'
                key='password'
                helpMessage=''
                placeholder='Пароль'
                dependencies={[]}
                rules={rulesForValidatingPassword}
                dataTestId='login-password'
            />
            <Form.Item className='login__helpers'>
                <Form.Item name='remember' valuePropName='checked' initialValue={false} noStyle>
                    <Checkbox data-test-id='login-remember'>Запонить меня</Checkbox>
                </Form.Item>

                <Button
                    data-test-id='login-forgot-button'
                    onClick={checkUserEmail}
                    type='link'
                    className='login-form-forgot'
                >
                    Забыли пароль?
                </Button>
            </Form.Item>
            <Form.Item className={'enter'}>
                <EnterButton
                    dataTestId='login-submit-button'
                    disabled={false}
                    htmlType='submit'
                    className={'enter-button'}
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
