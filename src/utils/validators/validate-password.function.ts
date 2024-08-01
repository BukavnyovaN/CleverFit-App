export const validatePassword = (value: string) : boolean => {
    return !(!value) &&
        /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
}
