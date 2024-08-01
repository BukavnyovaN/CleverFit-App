import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { useLocation } from "react-router-dom";
import { PATHS } from "@constants/paths.ts";

export const SuccessPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"success"}
                               title={"Регистрация успешна"}
                               subTitle={"Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль."}
                               buttonContent={"Войти"}
                               navigateTo={PATHS.AUTH}
                               location={location}
                               dataTestId={'registration-enter-button'}
                />
            </div>
        </div>
    )
}
