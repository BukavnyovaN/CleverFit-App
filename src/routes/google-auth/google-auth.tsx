import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';

export const GoogleAuth: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('accessToken');

    if (token === null) {
        return <Navigate to={PATHS.AUTH} />;
    }

    localStorage.setItem(AccessToken.token, token);
    return <Navigate to={PATHS.MAIN} />;
};
