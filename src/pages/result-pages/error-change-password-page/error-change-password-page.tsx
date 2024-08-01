import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { useLocation } from "react-router-dom";
import { PATHS } from "@constants/paths.ts";

export const ErrorChangePasswordPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"error"}
                               title={"Данные не сохранились"}
                               subTitle={"Что-то пошло не так. Попробуйте ещё раз."}
                               buttonContent={"Повторить"}
                               navigateTo={PATHS.CHANGE_PASSWORD}
                               location={location}
                               dataTestId='change-retry-button'

                />
            </div>
        </div>
    )
}
