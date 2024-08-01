import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../../types/user-state.type.ts';

const initialState: UserState = {
    user: {
        isLoggedIn: false,
        email: '',
        password: '',
        accessToken: '',
    },
    checked: false,
    personalInfo: {
        email: '',
        firstName: '',
        lastName: '',
        birthday: '',
        imgSrc: '',
        readyForJointTraining: false,
        sendNotification: false,
        tariff: {
            tariffId: '',
            expired: '',
        },
    },
    subscription: [
        {
            _id: '',
            name: '',
            periods: [
                {
                    text: '',
                    cost: 0,
                    days: 0,
                },
                {
                    text: '',
                    cost: 0,
                    days: 0,
                },
                {
                    text: '',
                    cost: 0,
                    days: 0,
                },
            ],
        },
    ],
};
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        saveEmail: (state, action) => {
            state.user.email = action.payload;
        },
        savePassword: (state, action) => {
            state.user.password = action.payload;
        },
        logout: () => {
            return initialState;
        },
        login: (state) => {
            state.user.isLoggedIn = true;
        },
        saveAccessToken: (state, action) => {
            state.user.accessToken = action.payload;
        },
        setPersonalInfo: (state, action: PayloadAction<Partial<UserState['personalInfo']>>) => {
            state.personalInfo = { ...state.personalInfo, ...action.payload };
        },
        setSubscription: (state, action) => {
            state.subscription = action.payload;
        },
    },
});

export const {
    setSubscription,
    setPersonalInfo,
    login,
    logout,
    saveEmail,
    savePassword,
    saveAccessToken,
} = userSlice.actions;
export default userSlice.reducer;
