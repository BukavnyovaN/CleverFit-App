import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { PATHS } from "@constants/paths.ts";
import { useLocation } from "react-router-dom";

export const ErrorEmailNoExistsPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"error"}
                               title={"Такой e-mail не зарегистрирован"}
                               subTitle={"Мы не нашли в базе вашего e-mail. Попробуйте  войти с другим e-mail."}
                               buttonContent={"Попробовать снова"}
                               navigateTo={PATHS.AUTH}
                               location={location}
                               dataTestId='check-retry-button'
                />
            </div>
        </div>
    )
}
