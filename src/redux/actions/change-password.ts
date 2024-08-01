import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { ENDPOINTS } from '@constants/endpoints.ts';

type ChangePasswordPayload = {
    password?: string;
    confirmPassword?: string;
};

export const changePassword = createAsyncThunk(
    'user/changePassword',
    async (
        { password, confirmPassword }: ChangePasswordPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.post(
                ENDPOINTS.BASE_URL + ENDPOINTS.CHANGE_PASSWORD,
                { password, confirmPassword },
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
