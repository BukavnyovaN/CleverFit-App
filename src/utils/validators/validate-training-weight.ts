export const validateTrainingWeight = (value: number): boolean => {
    return !isNaN(value) && value > 0;
}
