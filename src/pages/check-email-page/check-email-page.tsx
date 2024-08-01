import { useState } from "react";
import VerificationInput from "react-verification-input";
import { Result } from "antd";

import { useAppDispatch, useAppSelector } from "@hooks/typed-react-redux-hooks.ts";
import { confirmEmail } from "@redux/actions/confirm-email.ts";
import { Loader } from "@components/loader";

import './check-email-page.css';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { saveEmail } from "@redux/slice/user/user-slice.ts";
import { emailSelector, loadingSelector, prevLocationsSelector } from "@utils/helpers/selectors.ts";
import { PATHS } from "@constants/paths.ts";
import { RequestResult } from "../../enums/request-result.enum.ts";

export const CheckEmailPage = () => {
    const dispatch = useAppDispatch();
    const email = useAppSelector(emailSelector);
    const [error, setError] = useState(false);
    const loading = useAppSelector(loadingSelector);
    const [codeValue, setCodeValue] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const previousLocations = useAppSelector(prevLocationsSelector);

    const fetchConfirmEmail = async (code : string) => {
        const response = await dispatch(confirmEmail({ email, code })).unwrap();

        if(response === RequestResult.error) {
            setError(true);
            dispatch(saveEmail(email));
            setCodeValue('');
        } else {
            setError(false);
            navigate(PATHS.CHANGE_PASSWORD, {state : location});
            dispatch(saveEmail(email));
            setCodeValue('');
        }
    }

    return(
        ((!!location.state?.pathname && !!previousLocations)&&(location.state?.pathname === PATHS.AUTH)) ?
    <div className='auth-page'>
        <div className='auth-page__wrapper'>
            {loading && <Loader/>}
            <div className='check-email__form'>
                <div className='result-message'>
                    <Result
                        status={error ? "error" : undefined}
                        title={error ? "Неверный код. Введите код  для восстановления аккауанта" :
                            "Введите код  для восстановления аккауанта"}
                        extra={
                            <>
                                <div className='check-email__subtitle'>
                                    Мы отправили вам на e-mail
                                    <span className='check-email__subtitle-email'> {email} </span>
                                    шестизначный код. Введите его в поле ниже.
                                </div>
                                <VerificationInput
                                    classNames={error ?
                                        {
                                            container: "container-error",
                                            character: "character-error",
                                            characterInactive: "character--inactive-error",
                                            characterSelected: "character--selected-error",
                                            characterFilled: "character--filled-error",
                                        } :
                                        {
                                            container: "container",
                                            character: "character",
                                            characterInactive: "character--inactive",
                                            characterSelected: "character--selected",
                                            characterFilled: "character--filled",
                                        }}
                                    inputProps={{
                                        "data-test-id" : "verification-input",
                                    }}
                                    value={codeValue}
                                    placeholder={''}
                                    onChange={(value) => setCodeValue(value)}
                                    onComplete={(value) => fetchConfirmEmail(value)}
                                />
                                <div className='check-email__subtitle'>Не пришло письмо? Проверьте
                                    папку Спам.
                                </div>
                            </>
                        }
                    />
                </div>
            </div>
        </div>
    </div> :
    <Navigate to={'/auth'}/>
    )
}
