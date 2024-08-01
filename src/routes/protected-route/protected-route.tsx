import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { isLoggedInSelector } from '@utils/helpers/selectors.ts';
import { PATHS } from '@constants/paths.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { getUserInfo } from '@redux/actions/get-user-info.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { getInvites } from '@redux/actions/get-invites.ts';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useAppDispatch();
    const localStorageToken = localStorage.getItem(AccessToken.token);
    const accessToken = useGetAccessToken();
    const isLoggedIn = useAppSelector(isLoggedInSelector);

    useEffect(() => {
        dispatch(getInvites({ accessToken }));
        dispatch(getUserInfo({ accessToken }));
    }, []);

    return localStorageToken || isLoggedIn ? children : <Navigate to={PATHS.AUTH} />;
};
