import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { saveJoinTrainingUsers } from '@redux/slice/trainings/trainings-slice.ts';

type joinTrainingUsersPayload = {
    accessToken: Nullable<string>;
    trainingType?: string;
};

export const getJoinTrainingUsers = createAsyncThunk(
    'app/getJoinTrainingUsers',
    async (
        { accessToken, trainingType = '' }: joinTrainingUsersPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            const url = `${ENDPOINTS.BASE_URL}${ENDPOINTS.JOIN_USER}${
                trainingType ? `?trainingType=${trainingType}` : ''
            }`;

            const response = await axios.get(url, {
                headers: {
                    Authorization: AccessToken.bearer + accessToken,
                },
            });
            dispatch(saveJoinTrainingUsers(response.data));
            return RequestResult.success;
        } catch (error: unknown) {
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
