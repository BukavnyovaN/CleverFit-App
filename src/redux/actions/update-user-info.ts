import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { startLoading, stopLoading } from '@redux/slice/app/app-slice.ts';
import axios from 'axios';
import { ENDPOINTS } from '@constants/endpoints.ts';
import { AccessToken } from '../../enums/access-token.enum.ts';
import { setPersonalInfo } from '@redux/slice/user/user-slice.ts';
import { UserInfo } from '../../types/user-info.type.ts';
import { Nullable } from '@types/nullable.type.ts';

type updateUserPayload = {
    userInfo: UserInfo;
    accessToken: Nullable<string>;
};

export const updateUserInfo = createAsyncThunk(
    'app/updateUserInfo',
    async ({ accessToken, userInfo }: updateUserPayload, { dispatch }): Promise<RequestResult> => {
        try {
            dispatch(startLoading());
            const response = await axios.put(
                ENDPOINTS.BASE_URL + ENDPOINTS.UPDATE_USER,
                { ...userInfo },
                {
                    headers: {
                        Authorization: AccessToken.bearer + accessToken,
                    },
                },
            );
            dispatch(setPersonalInfo(response?.data));
            return RequestResult.success;
        } catch (error: unknown) {
            return RequestResult.error;
        } finally {
            dispatch(stopLoading());
        }
    },
);
