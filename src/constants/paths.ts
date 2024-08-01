export type IPATHS = {
    MAIN: string;
    AUTH: string;
    FEEDBACKS: string;
    ROOT: string;
    REGISTRATION: string;
    CONFIRM_EMAIL: string;
    CHANGE_PASSWORD: string;
    RESULT: string;
    ERROR_LOGIN: string;
    SUCCESS: string;
    SUCCESS_CHANGE_PASSWORD: string;
    ERROR: string;
    ERROR_USER_EXISTS: string;
    ERROR_EMAIL_NO_EXISTS: string;
    ERROR_EMAIL: string;
    ERROR_CHANGE_PASSWORD: string;
    NOT_FOUND: string;
    CALENDAR: string;
    PROFILE: string;
    SETTINGS: string;
    TRAININGS: string;
    ACHIEVEMENTS: string;
};

export const PATHS: IPATHS = {
    MAIN: '/main',
    AUTH: '/auth',
    FEEDBACKS: '/feedbacks',
    ROOT: '/',
    REGISTRATION: '/auth/registration',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    RESULT: '/result',
    SUCCESS: 'success',
    SUCCESS_CHANGE_PASSWORD: 'success-change-password',
    ERROR: 'error',
    ERROR_LOGIN: 'error-login',
    ERROR_USER_EXISTS: 'error-user-exist',
    ERROR_EMAIL_NO_EXISTS: 'error-check-email-no-exist',
    ERROR_EMAIL: 'error-check-email',
    ERROR_CHANGE_PASSWORD: 'error-change-password',
    NOT_FOUND: '*',
    CALENDAR: '/calendar',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    TRAININGS: '/trainings',
    ACHIEVEMENTS: '/achievements',
};
