import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetFeedbackPayload } from '../../types/get-feedback-payload.type.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import {
    setError,
    setTrainingListData,
    startLoading,
    stopLoading,
} from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';

export const getTrainingsList = createAsyncThunk(
    'app/getTrainingsList',
    async ({ accessToken }: GetFeedbackPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());

            const response = await axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.TRAININGS_LIST, {
                headers: {
                    Authorization: AccessToken.bearer + accessToken,
                },
            });
            dispatch(setTrainingListData(response.data));
            return RequestResult.success;
        } catch (error: unknown) {
            dispatch(setError(true));
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
