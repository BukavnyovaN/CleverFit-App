import { Feedback } from '../../types/feedback.type.ts';

export const sortArrayByCreatedDate = (data: Feedback[]) => {
    data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return data;
};
