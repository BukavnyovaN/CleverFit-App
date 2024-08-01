import React from "react";
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

import { RegistrationForm, LoginForm, Loader } from "../../components";
import logoDefault from "../../assets/images/logoDefault.png";

import './auth-page.css';
import { useAppSelector } from "@hooks/typed-react-redux-hooks.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { loadingSelector } from "@utils/helpers/selectors.ts";
import { PATHS } from "@constants/paths.ts";

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Вход',
        children: <LoginForm/>,
    },
    {
        key: '2',
        label: 'Регистрация',
        children: <RegistrationForm/>,
    }
];

export const AuthPage: React.FC<{tabKey : string}> = ({tabKey}) => {
    const loadingAuth = useAppSelector(loadingSelector);
    const location = useLocation();
    const navigate = useNavigate();
    const onChange = (key: string) => {
        if(key === "2") {
            navigate(PATHS.REGISTRATION, {state : location})
        }
        if(key === "1") {
            navigate(PATHS.AUTH, {state : location})
        }
    };

    return(
        <div key={tabKey} className='auth-page'>
            <div className='auth-page__wrapper'>
                {loadingAuth && <Loader/>}
                <div className='auth-page__form'>
                    <div className="auth-page__logo">
                        <img src={logoDefault} alt={'CleverFit logo'}/>
                    </div>
                    <Tabs defaultActiveKey={tabKey}
                          centered={true}
                          items={items}
                          onChange={onChange}
                    />
                </div>
            </div>
        </div>

    )
}
