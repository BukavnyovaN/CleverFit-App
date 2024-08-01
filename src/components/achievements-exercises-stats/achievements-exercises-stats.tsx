import { Training } from '@redux/actions/get-trainings.ts';
import { Pie } from '@ant-design/charts';
import { getExercisesCountMap } from '@utils/helpers/get-exercises-count-map.ts';
import './achievements-exercises-stats.css';
import { getMostPopularExerciseByWeekday } from '@utils/helpers/get-most-popular-exercise-by-weekday.ts';
import { Badge } from 'antd';
import { useWindowWidth } from '@hooks/use-window-width.ts';

export const AchievementsExercisesStats = ({ trainings }: { trainings: Training[] }) => {
    const weekdayData = getMostPopularExerciseByWeekday(trainings);
    const pieData = getExercisesCountMap(trainings, weekdayData);
    const { isMobile } = useWindowWidth();

    const pieConfig = {
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        paddingRight: 80,
        paddingLeft: 80,
        innerRadius: 0.7,
        label: {
            text: 'type',
            position: 'outside',
            connector: false,
            style: {
                fontSize: 14,
                fill: '#000000',
            },
        },
        legend: false,
        width: isMobile ? 330 : 380,
        height: isMobile ? 330 : 380,
        rerender: isMobile,
    };

    return (
        <div>
            {pieData.length ? (
                <div className='exercises-stats__wrapper'>
                    <Pie {...pieConfig} />
                    <div className='exercises-stats__week'>
                        <div className='achievements-week__title'>
                            Самые частые упражнения по дням недели
                        </div>
                        {weekdayData.map((weekday, index) => (
                            <div className='achievements-week__stats-item' key={weekday.day}>
                                <Badge
                                    count={index + 1}
                                    color={
                                        weekday.exercise
                                            ? 'var(--character-light-error)'
                                            : 'var(--character-light-red)'
                                    }
                                    style={{
                                        color: weekday.exercise
                                            ? ''
                                            : 'var(--character-light-error)',
                                    }}
                                />
                                <div className='achievements-week__content'>
                                    <div className='achievements-week__weekday'>{weekday.day}</div>
                                    <div className='exercises-stats__load'>{weekday.exercise}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
