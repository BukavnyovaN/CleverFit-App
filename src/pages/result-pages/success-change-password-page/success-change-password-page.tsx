import { ResultMessage } from "@components/result-message/Result-message.tsx";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@hooks/typed-react-redux-hooks.ts";
import { logout } from "@redux/slice/user/user-slice.ts";
import { PATHS } from "@constants/paths.ts";

export const SuccessChangePasswordPage = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    dispatch(logout());

    return (
        <div className='result-page'>
            <div className='result-page__wrapper'>
                <ResultMessage status={"success"}
                               title={"Пароль успешно изменен"}
                               subTitle={"Теперь можно войти в аккаунт, используя свой логин и пароль"}
                               buttonContent={"Вход"}
                               navigateTo={PATHS.AUTH}
                               location={location}
                               dataTestId='change-entry-button'
                />
            </div>
        </div>
    )
}
