import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { setError, startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { NewTraining } from '@utils/helpers/generate-trainings-data.ts';
import { Nullable } from "../../types/nullable.type.ts";

type PostTrainingPayload = {
    accessToken: Nullable<string>;
    newTraining: NewTraining;
    isJoinTraining?: boolean;
};

export const postTraining = createAsyncThunk(
    'app/postTraining',
    async (
        { accessToken, newTraining, isJoinTraining = false }: PostTrainingPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            const response = await axios.post(
                ENDPOINTS.BASE_URL + ENDPOINTS.TRAINING,
                { ...newTraining },
                {
                    headers: {
                        Authorization: AccessToken.bearer + accessToken,
                    },
                },
            );
            dispatch(setError(false));
            return isJoinTraining ? response.data._id : RequestResult.success;
        } catch (error: unknown) {
            dispatch(setError(true));
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
