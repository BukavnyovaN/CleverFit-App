import { RootState } from '@redux/configure-store.ts';

export const emailSelector = (state: RootState) => state.user.user.email;
export const passwordSelector = (state: RootState) => state.user.user.password;
export const isLoggedInSelector = (state: RootState) => state.user.user.isLoggedIn;
export const loadingSelector = (state: RootState) => state.app.loading;
export const accessTokenSelector = (state: RootState) => state.user.user.accessToken;
export const prevLocationsSelector = (state: RootState) => state.router?.previousLocations;
export const feedbacksData = (state: RootState) => state.app.feedbackData;
export const trainingsData = (state: RootState) => state.app.trainingsData;
export const trainingsListSelector = (state: RootState) => state.app.trainingList;
export const isErrorSelector = (state: RootState) => state.app.isError;
export const trainingsDrawerSelector = (state: RootState) => state.app.trainingDrawer;
export const newTrainingSelector = (state: RootState) => state.app.newTraining;
export const updatedTrainingSelector = (state: RootState) => state.app.updatedTraining;
export const personalInfoSelector = (state: RootState) => state.user.personalInfo;
export const subscriptionSelector = (state: RootState) => state.user.subscription;
export const trainingsPalsSelector = (state: RootState) => state.trainings.trainingPals;
export const joinUsersSelector = (state: RootState) => state.trainings.joinTrainingUsers;
export const joinUserSelector = (state: RootState) => state.trainings.joinTrainingUser;

export const invitesSelector = (state: RootState) => state.trainings.invites;
export const trainingIdSelector = (state: RootState) => state.app.trainingId;
