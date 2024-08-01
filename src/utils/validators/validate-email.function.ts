export const validateEmail = (value: string): boolean => {
    return !(!value) &&
        /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
}
