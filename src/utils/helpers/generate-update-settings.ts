import { UserInfo } from '../../types/user-info.type.ts';

export const generateUpdateSettings = (email: string, inputArray: any[]): UserInfo => {
    const outputValues: UserInfo = {
        readyForJointTraining: false,
        sendNotification: false,
        email: email,
    };

    for (const obj of inputArray) {
        const { name, value } = obj;

        if (name.includes('readyForJointTraining')) {
            outputValues.readyForJointTraining = value;
        } else if (name.includes('sendNotification')) {
            outputValues.sendNotification = value;
        }
    }

    return outputValues;
};
