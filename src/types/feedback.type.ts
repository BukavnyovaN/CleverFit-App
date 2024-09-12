import { Nullable } from './nullable.type.ts';

export type Feedback = {
    id: Nullable<string>;
    fullName: Nullable<string>;
    imageSrc: Nullable<string>;
    message: Nullable<string>;
    rating: number;
    createdAt: string;
};
