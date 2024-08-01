import './error-login-page.css';
import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { PATHS } from "@constants/paths.ts";
import { useLocation } from "react-router-dom";

export const ErrorLoginPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"warning"}
                               title={"Вход не выполнен"}
                               subTitle={"Что-то пошло не так. Попробуйте еще раз"}
                               buttonContent={"Повторить"}
                               navigateTo={PATHS.AUTH}
                               location={location}
                               dataTestId='login-retry-button'
                />
            </div>
        </div>
    )
}
