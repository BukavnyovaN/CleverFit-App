export const isFutureDate = (date : string) : boolean => {
    const [day, month, year] = date.split('.').map(Number);
    const givenDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    return givenDate > currentDate;
}
