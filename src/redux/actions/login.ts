import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, saveAccessToken } from '@redux/slice/user/user-slice.ts';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';

type LoginUserResponse = {
    accessToken: string;
};

type LoginUserPayload = {
    email?: string;
    password?: string;
    checked?: boolean;
};

export const loginUser = createAsyncThunk(
    'user/login',
    async (
        { email, password, checked }: LoginUserPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());

            const response = await axios.post<LoginUserResponse>(
                ENDPOINTS.BASE_URL + ENDPOINTS.LOGIN,
                { email, password },
            );

            dispatch(saveAccessToken(response.data.accessToken));

            if (checked) {
                localStorage.setItem(AccessToken.token, response.data.accessToken);
            }

            dispatch(login());
            return RequestResult.success;
        } catch (error: unknown) {
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
