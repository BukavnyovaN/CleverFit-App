import { ENDPOINTS } from '@constants/endpoints.ts';
import { UserInfo } from '../../types/user-info.type.ts';

export type ProfileFormValues = {
    avatar: {
        file: {
            uid: string;
            lastModified: number;
            lastModifiedDate: string;
            name: string;
            size: number;
            type: string;
            percent: number;
            originFileObj: {
                uid: string;
            };
            status: string;
            response: {
                name: string;
                url: string;
            };
            xhr: any;
        };
        fileList: {
            uid: string;
            lastModified: number;
            lastModifiedDate: string;
            name: string;
            size: number;
            type: string;
            percent: number;
            originFileObj: {
                uid: string;
            };
            status: string;
            response: {
                name: string;
                url: string;
            };
            xhr: any;
        }[];
    };
    firstName: string;
    lastName: string;
    birthday: string;
    username: string;
    password: string;
    confirmPassword: string;
};

export const generateUpdateUserBody = (formValues: ProfileFormValues): UserInfo => {
    const { avatar, firstName, lastName, birthday, username, password } = formValues;
    const imgSrc = avatar?.file?.response?.url
        ? `${ENDPOINTS.IMAGE_URL}${avatar.file?.response?.url}`
        : undefined;

    const outputValues: UserInfo = {
        email: username,
        readyForJointTraining: false,
        sendNotification: false,
    };

    if (password) {
        outputValues.password = password;
    }

    if (firstName) {
        outputValues.firstName = firstName;
    }

    if (lastName) {
        outputValues.lastName = lastName;
    }

    if (birthday) {
        outputValues.birthday = new Date(birthday).toISOString();
    }

    if (imgSrc) {
        outputValues.imgSrc = imgSrc;
    }

    return outputValues;
};
