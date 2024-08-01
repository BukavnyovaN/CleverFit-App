import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { setError, startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { UpdatedTrainingBody } from '@utils/helpers/generate-put-request-body.ts';
import { Nullable } from '@types/nullable.type.ts';

type PutTrainingPayload = {
    accessToken: Nullable<string>;
    id: string;
    updatedTraining: UpdatedTrainingBody;
};

export const putTraining = createAsyncThunk(
    'app/putTraining',
    async (
        { accessToken, id, updatedTraining }: PutTrainingPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.put(
                ENDPOINTS.BASE_URL + ENDPOINTS.TRAINING + ENDPOINTS.ROOT + id,
                { ...updatedTraining },
                {
                    headers: {
                        Authorization: AccessToken.bearer + accessToken,
                    },
                },
            );
            dispatch(setError(false));
            return RequestResult.success;
        } catch (error: unknown) {
            dispatch(setError(true));
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
