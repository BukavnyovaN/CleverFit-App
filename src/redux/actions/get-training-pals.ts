import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetFeedbackPayload } from '../../types/get-feedback-payload.type.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { saveTrainingPals } from '@redux/slice/trainings/trainings-slice.ts';

export const getTrainingPals = createAsyncThunk(
    'app/getTrainingPals',
    async ({ accessToken }: GetFeedbackPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());

            const response = await axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.PALS, {
                headers: {
                    Authorization: AccessToken.bearer + accessToken,
                },
            });
            dispatch(saveTrainingPals(response.data));
            return RequestResult.success;
        } catch (error: unknown) {
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
