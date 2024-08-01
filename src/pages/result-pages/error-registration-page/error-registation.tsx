import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { PATHS } from "@constants/paths.ts";
import { useLocation } from "react-router-dom";

export const ErrorRegistrationPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"error"}
                               title={"Данные не сохранились"}
                               subTitle={"Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз."}
                               buttonContent={"Повторить"}
                               navigateTo={PATHS.REGISTRATION}
                               location={location}
                               dataTestId='registration-retry-button'
                />
            </div>
        </div>
    )
}
