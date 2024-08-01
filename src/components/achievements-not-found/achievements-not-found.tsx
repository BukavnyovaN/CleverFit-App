import notFoundTraining from '../../assets/images/notFoundTraining.png';
import './achievements-not-found.css';
import { StatsPeriod } from '../../enums/stats-period.enum.ts';

export const AchievementsNotFound = ({ period }: { period: StatsPeriod }) => (
    <div className='training-not-found__wrapper'>
        <div className='training-not-found__image'>
            <img src={notFoundTraining} alt='training not found' />
        </div>
        <div className='training-not-found__description'>
            {period === StatsPeriod.week
                ? 'Ой, такой тренировки на этой неделе не было.'
                : 'Ой, такой тренировки в этом месяце не было.'}
        </div>
    </div>
);
