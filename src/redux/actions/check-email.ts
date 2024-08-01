import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { HttpStatusCode } from 'axios';

import { saveEmail } from '@redux/slice/user/user-slice.ts';
import { EmailPayload } from '../../types/check-email-payload.type.ts';
import { ErrorResponse } from '../../types/error-response.type.ts';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';

type CheckEmailResponse = {
    email: string;
    message: string;
};

export const checkEmail = createAsyncThunk(
    'user/checkEmail',
    async ({ email }: EmailPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            const response = await axios.post<CheckEmailResponse>(
                ENDPOINTS.BASE_URL + ENDPOINTS.CHECK_EMAIL,
                { email },
            );
            dispatch(saveEmail(response.data.email));
            return RequestResult.success;
        } catch (error: unknown) {
            const notFoundMessage = 'Email не найден';
            const isNotFoundError =
                axios.isAxiosError<ErrorResponse>(error) &&
                error.response?.status === HttpStatusCode.NotFound &&
                error.response?.data.message === notFoundMessage;
            return isNotFoundError ? RequestResult.not_found : RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
