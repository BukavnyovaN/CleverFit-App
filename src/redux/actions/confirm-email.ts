import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import { ConfirmEmailPayload } from '../../types/confirm-email-payload.type.ts';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';

export const confirmEmail = createAsyncThunk(
    'user/confirmEmail',
    async ({ email, code }: ConfirmEmailPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.post(
                ENDPOINTS.BASE_URL + ENDPOINTS.CONFIRM_EMAIL,
                { email, code },
                { withCredentials: true },
            );
            return RequestResult.success;
        } catch (error: unknown) {
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
