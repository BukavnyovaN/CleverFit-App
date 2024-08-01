import { Training } from '@redux/actions/get-trainings.ts';
import { TrainingsNames } from '../../enums/trainings-names.enum.ts';

export const getMostPopularTraining = (trainings: Training[]): string => {
    if (trainings.length) {
        const result: Record<string, number> = {};
        trainings.forEach((training) => {
            if (training?.exercises?.length > 0) {
                const key = training?.name;
                const totalLoad = training?.exercises.reduce((acc, exercise) => {
                    return acc + exercise?.replays * exercise?.weight * exercise?.approaches;
                }, 0);

                result[key] = (result[key] || 0) + totalLoad;
            }
        });

        const entries = Object.entries(result);

        if (entries.length > 0) {
            const [maxKey] = entries.sort((a, b) => b[1] - a[1])[0];
            return TrainingsNames[maxKey as keyof typeof TrainingsNames];
        }
    }
    return '';
};
