import './achievements-stats.css';
import { calculateLoadStats } from '@utils/helpers/calculate-load-stats.ts';
import { Training } from '@redux/actions/get-trainings.ts';
import { StatsPeriod } from '../../enums/stats-period.enum.ts';

type AchievementsStatsProps = {
    trainingData: Training[];
    period: StatsPeriod;
};
export const AchievementsStats = ({ trainingData, period }: AchievementsStatsProps) => {
    const loadStats = calculateLoadStats(trainingData, period);

    return (
        <div className='achievements-week__stats'>
            <div className='achievements-week__stats-card'>
                <div className='achievements-week__stats-data'>{loadStats.totalLoad}</div>
                <div className='achievements-week__stats-title'>Общая нагрузка, кг</div>
            </div>
            <div className='achievements-week__stats-card'>
                <div className='achievements-week__stats-data'>{loadStats.avgLoadPerDay}</div>
                <div className='achievements-week__stats-title'>Нагрузка в день, кг</div>
            </div>
            <div className='achievements-week__stats-card'>
                <div className='achievements-week__stats-data'>{loadStats.totalReplays}</div>
                <div className='achievements-week__stats-title'>Количество повторений, раз</div>
            </div>
            <div className='achievements-week__stats-card'>
                <div className='achievements-week__stats-data'>{loadStats.totalApproaches}</div>
                <div className='achievements-week__stats-title'>Подходы, раз</div>
            </div>
        </div>
    );
};
