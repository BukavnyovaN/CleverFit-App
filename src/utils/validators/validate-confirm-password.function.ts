export const validateConfirmPassword = (value: string, confirmValue: string): boolean => {
    return value === confirmValue;
}
