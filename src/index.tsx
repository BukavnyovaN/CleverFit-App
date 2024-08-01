import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';

import { PATHS } from '@constants/paths.ts';
import { store, history } from '@redux/configure-store';
import {
    AchievementsPage,
    AuthPage,
    ChangePasswordPage,
    ErrorChangePasswordPage,
    ErrorCheckEmailPage,
    ErrorEmailNoExistsPage,
    ErrorEmailRegistrationPage,
    ErrorLoginPage,
    ErrorRegistrationPage,
    MainPage,
    ProfilePage,
    SettingsPage,
} from './pages';
import { SuccessPage } from '@pages/result-pages/success-page';
import { ResultPage } from '@pages/result-page/result-page.tsx';
import { CheckEmailPage } from '@pages/check-email-page/check-email-page.tsx';
import { ProtectedRoute, GoogleAuth, PublicRoute } from './routes';
import { SuccessChangePasswordPage } from '@pages/result-pages/success-change-password-page/success-change-password-page.tsx';

import 'normalize.css';
import './index.css';
import { configureTestMode } from './axios/configure-test-mode.ts';
import { MainLayout } from './layouts/main-layout/main-layout.tsx';
import { FeedbacksPage } from '@pages/feedbacks-page/feedbacks-page.tsx';
import { CalendarPage } from '@pages/calendar-page/calendar-page.tsx';
import { NotFoundPage } from '@pages/not-found-page';
import { TrainingsPage } from '@pages/trainings-page/trainings-page.tsx';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

configureTestMode();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route
                            path={PATHS.MAIN}
                            element={
                                <ProtectedRoute>
                                    <MainPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PATHS.FEEDBACKS}
                            element={
                                <ProtectedRoute>
                                    <FeedbacksPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PATHS.CALENDAR}
                            element={
                                <ProtectedRoute>
                                    <CalendarPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PATHS.PROFILE}
                            element={
                                <ProtectedRoute>
                                    <ProfilePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PATHS.TRAININGS}
                            element={
                                <ProtectedRoute>
                                    <TrainingsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PATHS.SETTINGS}
                            element={
                                <ProtectedRoute>
                                    <SettingsPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={PATHS.ACHIEVEMENTS}
                            element={
                                <ProtectedRoute>
                                    <AchievementsPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route element={<MainLayout showHeader={false} />}>
                        <Route
                            path={PATHS.NOT_FOUND}
                            element={
                                <ProtectedRoute>
                                    <NotFoundPage />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    <Route
                        path={PATHS.AUTH}
                        element={
                            <PublicRoute>
                                <AuthPage tabKey='1' />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path={PATHS.REGISTRATION}
                        element={
                            <PublicRoute>
                                <AuthPage tabKey='2' />
                            </PublicRoute>
                        }
                    />

                    <Route path={PATHS.ROOT} element={<GoogleAuth />} />

                    <Route path={PATHS.RESULT} element={<ResultPage />}>
                        <Route path={PATHS.ERROR_LOGIN} element={<ErrorLoginPage />} />
                        <Route
                            path={PATHS.ERROR_USER_EXISTS}
                            element={<ErrorEmailRegistrationPage />}
                        />
                        <Route path={PATHS.ERROR} element={<ErrorRegistrationPage />} />
                        <Route path={PATHS.SUCCESS} element={<SuccessPage />} />
                        <Route
                            path={PATHS.ERROR_EMAIL_NO_EXISTS}
                            element={<ErrorEmailNoExistsPage />}
                        />
                        <Route path={PATHS.ERROR_EMAIL} element={<ErrorCheckEmailPage />} />
                        <Route
                            path={PATHS.SUCCESS_CHANGE_PASSWORD}
                            element={<SuccessChangePasswordPage />}
                        />
                        <Route
                            path={PATHS.ERROR_CHANGE_PASSWORD}
                            element={<ErrorChangePasswordPage />}
                        />
                    </Route>
                    <Route path={PATHS.CONFIRM_EMAIL} element={<CheckEmailPage />} />
                    <Route path={PATHS.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
