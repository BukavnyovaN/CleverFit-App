import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';

type PutInvitePayload = {
    status: string;
    accessToken: Nullable<string>;
    id?: string;
};

export const putInvite = createAsyncThunk(
    'app/putInvite',
    async ({ accessToken, id, status }: PutInvitePayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.put(
                ENDPOINTS.BASE_URL + ENDPOINTS.INVITE,
                { id, status },
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
