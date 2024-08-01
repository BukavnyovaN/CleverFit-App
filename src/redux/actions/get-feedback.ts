import { createAsyncThunk } from '@reduxjs/toolkit';
import { setFeedbackData, startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios, { HttpStatusCode } from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { GetFeedbackPayload } from '../../types/get-feedback-payload.type.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { ErrorResponse } from '../../types/error-response.type.ts';
import { sortArrayByCreatedDate } from '@utils/helpers/sort-array-by-created-date.ts';

export const getFeedback = createAsyncThunk(
    'app/getFeedback',
    async ({ accessToken }: GetFeedbackPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());

            const response = await axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.FEEDBACK, {
                headers: {
                    Authorization: AccessToken.bearer + accessToken,
                },
            });
            const data = sortArrayByCreatedDate(response.data);
            dispatch(setFeedbackData(data));
            return RequestResult.success;
        } catch (error: unknown) {
            const isUnauthorized =
                axios.isAxiosError<ErrorResponse>(error) &&
                error.response?.status === HttpStatusCode.Forbidden;
            return isUnauthorized ? RequestResult.user_unauthorized : RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
