import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetFeedbackPayload } from '../../types/get-feedback-payload.type.ts';
import {
    setError,
    setTrainingsData,
    startLoading,
    stopLoading,
} from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { Nullable } from '../../types/nullable.type.ts';

export type Exercise = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
    _id?: string;
};

export type TrainingParameters = {
    repeat: boolean;
    period: Nullable<number>;
    jointTraining: boolean;
    participants?: string[];
};

export type Training = {
    name: string;
    date: string;
    isImplementation: boolean;
    parameters: TrainingParameters;
    exercises: Exercise[];
    _id?: string;
    userId?: string;
};

export const getTrainings = createAsyncThunk(
    'app/getTrainings',
    async ({ accessToken }: GetFeedbackPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            const response = await axios.get(ENDPOINTS.BASE_URL + ENDPOINTS.TRAINING, {
                headers: {
                    Authorization: AccessToken.bearer + accessToken,
                },
            });
            dispatch(setTrainingsData(response.data));
            return RequestResult.success;
        } catch (error: unknown) {
            dispatch(setError(true));
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
