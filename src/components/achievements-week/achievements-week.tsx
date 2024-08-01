import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingsData } from '@utils/helpers/selectors.ts';
import { useState } from 'react';
import './achievements-week.css';
import { AchievementsTags } from '@components/achievements-tags';
import { getTrainingsBySelectedPeriod } from '@utils/helpers/get-trainings-by-selected-period.ts';
import moment from 'moment';
import { getAvgLoad } from '@utils/helpers/get-avg-load.ts';
import { Column } from '@ant-design/charts';
import { DATE_FORMAT_DD_MM } from '@constants/date-format.ts';
import { filterTrainingsByName } from '@utils/helpers/filter-trainings-by-name.ts';
import { AchievementsWeekdayLoad } from '@components/achievements-weekday-load';
import { AchievementsStats } from '@components/achievements-stats';
import { AchievementsPopular } from '@components/achievements-popular';
import { AllFilter } from '../../enums/all-filter.enum.ts';
import { AchievementsExercisesStats } from '@components/achievements-exercises-stats/achievements-exercises-stats.tsx';
import { AchievementsNotFound } from '@components/achievements-not-found';
import { StatsPeriod } from '../../enums/stats-period.enum.ts';
import { useWindowWidth } from '@hooks/use-window-width.ts';

export const AchievementsWeek = () => {
    const currentDate = moment();
    const startDate = currentDate.clone().subtract(6, 'days').startOf('day');
    const endDate = currentDate.clone().endOf('day');
    const trainings = useAppSelector(trainingsData);
    const [selectedTags, setSelectedTags] = useState<string>(AllFilter.allFilter);
    const filteredTrainings = filterTrainingsByName(trainings, selectedTags);
    const trainingsByPeriod = getTrainingsBySelectedPeriod(filteredTrainings, startDate, endDate);
    const data = getAvgLoad(startDate, endDate, trainingsByPeriod, DATE_FORMAT_DD_MM);
    const { isMobile } = useWindowWidth();

    const handleChange = (tag: string) => {
        setSelectedTags(tag);
    };

    const config = {
        data,
        xField: 'date',
        yField: 'load',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                titleSpacing: 16,
                titlePosition: 'bottom',
                titleFontSize: 14,
                tick: false,
                labelSpacing: 16,
            },
            y: {
                labelFormatter: (value: number) => `${value} кг`,
                tick: false,
                labelSpacing: 16,
            },
        },
        style: {
            fill: '#85A5FFFF',
        },
        sizeField: 25,
        rerender: isMobile,
    };

    return (
        <div className='achievements-week__wrapper'>
            <div className='achievements-week__tags'>
                <div className='achievements-week__label'>Тип тренировки:</div>
                <div className='achievements-week__tag'>
                    <AchievementsTags selectedTag={selectedTags} handleChange={handleChange} />
                </div>
            </div>
            {trainingsByPeriod.length > 0 ? (
                <div>
                    <div className='achievements-week__avg-load'>
                        <div className='achievements-week__chart'>
                            <Column width={isMobile ? undefined : 520} height={334} {...config} />
                        </div>
                        <AchievementsWeekdayLoad data={data} />
                    </div>
                    <AchievementsStats trainingData={trainingsByPeriod} period={StatsPeriod.week} />
                    <AchievementsPopular
                        trainings={trainingsByPeriod}
                        selectedFilter={selectedTags}
                    />
                    <AchievementsExercisesStats trainings={trainingsByPeriod} />
                </div>
            ) : (
                <AchievementsNotFound period={StatsPeriod.week} />
            )}
        </div>
    );
};
