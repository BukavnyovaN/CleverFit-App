import React from 'react';
import {Navigate} from "react-router-dom";
import { useAppSelector } from "@hooks/typed-react-redux-hooks.ts";
import { isLoggedInSelector } from "@utils/helpers/selectors.ts";
import { PATHS } from "@constants/paths.ts";
import { AccessToken } from "../../enums/access-token.enum.ts";

export const PublicRoute : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const localStorageToken = localStorage.getItem(AccessToken.token);
    const isLoggedIn = useAppSelector(isLoggedInSelector);

    return (localStorageToken || isLoggedIn) ? <Navigate to={PATHS.MAIN} /> : children
};
