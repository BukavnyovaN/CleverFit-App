import { Training } from '@redux/actions/get-trainings.ts';
import { getMostPopularTrainingAndExercise } from '@utils/helpers/get-most-popular-exercise.ts';
import './achievements-popular.css';
import { AllFilter } from '../../enums/all-filter.enum.ts';

export const AchievementsPopular = ({
    trainings,
    selectedFilter,
}: {
    trainings: Training[];
    selectedFilter: string;
}) => {
    const mostPopularTrainingAndName = getMostPopularTrainingAndExercise(trainings);

    return (
        <div className='achievements-popular__wrapepr'>
            {selectedFilter === AllFilter.allFilter && (
                <div className='achievements-popular__content'>
                    <div className='achievements-popular__title'>
                        Самая частая <br /> тренировка
                    </div>
                    <div className='achievements-popular__data'>
                        {mostPopularTrainingAndName.trainingName.toLowerCase()}
                    </div>
                </div>
            )}
            <div className='achievements-popular__content'>
                <div className='achievements-popular__title'>
                    Самое частое <br /> упражнение
                </div>
                <div className='achievements-popular__data'>
                    {mostPopularTrainingAndName?.exerciseName?.toLowerCase() || 'Нет упражнений'}
                </div>
            </div>
        </div>
    );
};
