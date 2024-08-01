import { createSlice } from '@reduxjs/toolkit';
import { Training } from '@redux/actions/get-trainings.ts';
import { Nullable } from '../../../types/nullable.type.ts';

export type TrainingPal = {
    id: string;
    name: string;
    trainingType: string;
    inviteId: string;
    status: string;
    imageSrc?: string;
    avgWeightInWeek?: number;
};

export type JoinTrainingUser = {
    id: string;
    name: string;
    trainingType: string;
    inviteId: string;
    imageSrc?: string;
    avgWeightInWeek?: number;
    status?: string;
};

export type User = {
    _id: string;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
    imageSrc: Nullable<string>;
};

export type JoinTraining = {
    _id: string;
    from: User;
    training: Training;
    status: string;
    createdAt: string;
};

export type TrainingsState = {
    trainingPals: TrainingPal[];
    joinTrainingUsers: JoinTrainingUser[];
    joinTrainingUser?: JoinTrainingUser;
    invites?: JoinTraining[];
};

const initialState: TrainingsState = {
    trainingPals: [],
    joinTrainingUsers: [],
    joinTrainingUser: undefined,
    invites: undefined,
};

const trainingsSlice = createSlice({
    name: 'trainings',
    initialState: initialState,
    reducers: {
        saveTrainingPals: (state, action) => {
            state.trainingPals = action.payload;
        },
        saveJoinTrainingUsers: (state, action) => {
            state.joinTrainingUsers = action.payload;
        },
        saveJoinTrainingUser: (state, action) => {
            state.joinTrainingUser = action.payload;
        },
        saveInvites: (state, action) => {
            state.invites = action.payload;
        },
    },
});

export const { saveTrainingPals, saveJoinTrainingUsers, saveJoinTrainingUser, saveInvites } =
    trainingsSlice.actions;
export default trainingsSlice.reducer;
