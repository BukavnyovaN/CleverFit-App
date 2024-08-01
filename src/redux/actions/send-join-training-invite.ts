import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { Nullable } from '@types/nullable.type.ts';

type sendInvitePayload = {
    to?: string;
    trainingId: string;
    accessToken: Nullable<string>;
};

export const sendInvite = createAsyncThunk(
    'app/sendInvite',
    async (
        { accessToken, to, trainingId }: sendInvitePayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.post(
                ENDPOINTS.BASE_URL + ENDPOINTS.INVITE,
                { to, trainingId },
                {
                    headers: {
                        Authorization: AccessToken.bearer + accessToken,
                    },
                },
            );
            return RequestResult.success;
        } catch (error: unknown) {
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
