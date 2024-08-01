export type Endpoints = {
    BASE_URL: string;
    IMAGE_URL: string;
    GOOGLE_AUTH: string;
    REGISTRATION: string;
    CONFIRM_EMAIL: string;
    CHANGE_PASSWORD: string;
    LOGIN: string;
    CHECK_EMAIL: string;
    FEEDBACK: string;
    ROOT: string;
    TRAINING: string;
    TRAININGS_LIST: string;
    GET_USER: string;
    UPLOAD_PROFILE_IMAGE: string;
    UPDATE_USER: string;
    TARIFFS_LIST: string;
    TARIFF: string;
    PALS: string;
    JOIN_USER: string;
    INVITE: string;
};

export const ENDPOINTS: Endpoints = {
    BASE_URL: 'https://marathon-api.clevertec.ru',
    IMAGE_URL: 'https://training-api.clevertec.ru',
    ROOT: '/',
    GOOGLE_AUTH: '/auth/google',
    REGISTRATION: '/auth/registration',
    CONFIRM_EMAIL: '/auth/confirm-email',
    CHANGE_PASSWORD: '/auth/change-password',
    LOGIN: '/auth/login',
    CHECK_EMAIL: '/auth/check-email',
    FEEDBACK: '/feedback',
    TRAINING: '/training',
    TRAININGS_LIST: '/catalogs/training-list',
    GET_USER: '/user/me',
    UPDATE_USER: '/user',
    UPLOAD_PROFILE_IMAGE: '/upload-image',
    TARIFFS_LIST: '/catalogs/tariff-list',
    TARIFF: '/tariff',
    PALS: '/catalogs/training-pals',
    JOIN_USER: '/catalogs/user-joint-training-list',
    INVITE: '/invite',
};
