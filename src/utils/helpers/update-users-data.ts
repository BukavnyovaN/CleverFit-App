import { JoinTrainingUser } from '@redux/slice/trainings/trainings-slice.ts';

export const updateUserData = (
    userData: JoinTrainingUser[],
    userId?: string,
): JoinTrainingUser[] => {
    return userData.map((user) => {
        if (user.id === userId) {
            return {
                ...user,
                status: 'pending',
            };
        }
        return user;
    });
};
