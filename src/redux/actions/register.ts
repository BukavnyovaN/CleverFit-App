import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { HttpStatusCode } from 'axios';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import { ErrorResponse } from '../../types/error-response.type.ts';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';

type RegisterUserPayload = {
    email?: string;
    password?: string;
};

export const registerUser = createAsyncThunk(
    'user/register',
    async ({ email, password }: RegisterUserPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.post(ENDPOINTS.BASE_URL + ENDPOINTS.REGISTRATION, {
                email,
                password,
            });
            return RequestResult.success;
        } catch (error: unknown) {
            const isUserExistsError =
                axios.isAxiosError<ErrorResponse>(error) &&
                error.response?.status === HttpStatusCode.Conflict;
            return isUserExistsError ? RequestResult.user_exists : RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
