export type UserState = {
    user: {
        isLoggedIn: boolean;
        email: string;
        password: string;
        accessToken: string;
    };
    checked: boolean;
    personalInfo: PersonalInfo;
    subscription: Subscription[];
};

export type PersonalInfo = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: Tariff;
};

export type Tariff = {
    tariffId: string;
    expired: string;
};

export type Period = {
    text: string;
    cost: number;
    days: number;
};

export type Subscription = {
    _id: string;
    name: string;
    periods: Period[];
};
