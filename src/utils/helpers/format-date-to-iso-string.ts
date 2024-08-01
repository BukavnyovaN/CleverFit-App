import { Nullable } from '../../types/nullable.type.ts';

export const formatDateToIsoString = (dateString: string): Nullable<string> => {
    try {
        const dateParts = dateString.split('.');
        if (dateParts.length !== 3) {
            return null;
        }

        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
        const day = parseInt(dateParts[0], 10) + 1;

        if (isNaN(year) || isNaN(month) || isNaN(day)) {
            return null;
        }

        const date = new Date(year, month, day);
        const now = new Date();
        const combinedDate = new Date(date.getTime() + now.getTimezoneOffset() * 60 * 1000);

        return combinedDate.toISOString();
    } catch (error: unknown) {
        return null;
    }
};

export const formatDate = (inputDate: Nullable<string>): string => {
    if (inputDate === null) {
        return '';
    }
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};
