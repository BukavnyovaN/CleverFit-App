import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';

type FeedbackPayload = {
    rating: number;
    accessToken: Nullable<string>;
    message?: string;
};

export const createFeedback = createAsyncThunk(
    'app/createFeedback',
    async (
        { rating, message, accessToken }: FeedbackPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.post(
                ENDPOINTS.BASE_URL + ENDPOINTS.FEEDBACK,
                {
                    message,
                    rating,
                },
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
