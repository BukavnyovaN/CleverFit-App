import { createSlice } from '@reduxjs/toolkit';
import { Feedback } from '../../../types/feedback.type.ts';
import { Training } from '@redux/actions/get-trainings.ts';
import { TrainingList } from '../../../types/trainings-list.type.ts';
import { NewTraining } from '@utils/helpers/generate-trainings-data.ts';

type AppState = {
    loading: boolean;
    feedbackData: Feedback[];
    trainingsData: Training[];
    trainingList: TrainingList[];
    newTraining: NewTraining;
    updatedTraining: Training;
    isError: boolean;
    trainingDrawer: {
        isTrainingsDrawer: boolean;
        isEditDrawer: boolean;
        isViewDrawer: boolean;
        isJoinTrainingDrawer: boolean;
    };
    trainingId: string;
};

const initialState: AppState = {
    loading: false,
    feedbackData: [],
    trainingsData: [],
    trainingList: [],
    newTraining: {
        name: '',
        date: null,
        isImplementation: false,
        parameters: {
            repeat: false,
            period: 7,
            jointTraining: false,
            participants: [],
        },
        exercises: [],
    },
    updatedTraining: {
        _id: '',
        name: '',
        date: '',
        isImplementation: false,
        userId: '',
        parameters: {
            repeat: false,
            period: 7,
            jointTraining: false,
            participants: [],
        },
        exercises: [],
    },
    isError: false,
    trainingDrawer: {
        isTrainingsDrawer: false,
        isEditDrawer: false,
        isViewDrawer: false,
        isJoinTrainingDrawer: false,
    },
    trainingId: '',
};

const appSlice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
        },
        stopLoading: (state) => {
            state.loading = false;
        },
        setFeedbackData: (state, action) => {
            state.feedbackData = action.payload;
        },
        setTrainingsData: (state, action) => {
            state.trainingsData = action.payload;
        },
        setError: (state, action) => {
            state.isError = action.payload;
        },
        setTrainingListData: (state, action) => {
            state.trainingList = action.payload;
        },
        openTrainingsDrawer: (state, action) => {
            state.trainingDrawer.isTrainingsDrawer = action.payload;
        },
        openEditTrainingsDrawer: (state, action) => {
            state.trainingDrawer.isEditDrawer = action.payload;
        },
        openJoinTrainingsDrawer: (state, action) => {
            state.trainingDrawer.isJoinTrainingDrawer = action.payload;
        },
        openViewTrainingsDrawer: (state, action) => {
            state.trainingDrawer.isViewDrawer = action.payload;
        },
        saveNewTraining: (state, action) => {
            state.newTraining = action.payload;
        },
        clearNewTraining: (state) => {
            state.newTraining = initialState.newTraining;
        },
        saveUpdatedTraining: (state, action) => {
            state.updatedTraining = action.payload;
        },
        clearUpdatedTraining: (state) => {
            state.updatedTraining = initialState.updatedTraining;
        },
        saveTrainingId: (state, action) => {
            state.trainingId = action.payload;
        },
    },
});

export const {
    stopLoading,
    startLoading,
    setFeedbackData,
    setTrainingsData,
    setError,
    setTrainingListData,
    openTrainingsDrawer,
    saveNewTraining,
    clearNewTraining,
    openEditTrainingsDrawer,
    saveUpdatedTraining,
    clearUpdatedTraining,
    openViewTrainingsDrawer,
    openJoinTrainingsDrawer,
    saveTrainingId,
} = appSlice.actions;
export default appSlice.reducer;
