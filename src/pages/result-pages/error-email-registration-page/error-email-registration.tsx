import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { PATHS } from "@constants/paths.ts";
import { useLocation } from "react-router-dom";

export const ErrorEmailRegistrationPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"error"}
                               title={"Данные не сохранились"}
                               subTitle={"Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail."}
                               buttonContent={"Назад к регистрации"}
                               navigateTo={PATHS.REGISTRATION}
                               location={location}
                               dataTestId='registration-back-button'
                />
            </div>
        </div>
    )
}
