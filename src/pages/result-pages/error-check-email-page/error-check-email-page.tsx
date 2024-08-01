import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { PATHS } from "@constants/paths.ts";
import { useLocation } from "react-router-dom";

export const ErrorCheckEmailPage = () => {
    const location = useLocation();
    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"500"}
                               title={"Что-то пошло не так"}
                               subTitle={"Произошла ошибка, попробуйте отправить форму еще раз."}
                               buttonContent={"Назад"}
                               navigateTo={PATHS.AUTH}
                               location={location}
                               dataTestId='check-back-button'
                />
            </div>
        </div>
    )
}
