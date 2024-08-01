import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { TariffsBody } from '@utils/helpers/generate-tariff-body.ts';

type postTariffPayload = {
    tariffBody: Nullable<TariffsBody>;
    accessToken: Nullable<string>;
};

export const postProTariff = createAsyncThunk(
    'app/postProTariff',
    async (
        { accessToken, tariffBody }: postTariffPayload,
        { dispatch },
    ): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            await axios.post(
                ENDPOINTS.BASE_URL + ENDPOINTS.TARIFF,
                { ...tariffBody },
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
