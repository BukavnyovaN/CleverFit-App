import { TrainingLoad } from '@utils/helpers/get-avg-load.ts';
import { Badge } from 'antd';
import { sortDataByWeekdays } from '@utils/helpers/sort-data-by-weekdays.ts';
import './achievements-weekday-load.css';
import moment from 'moment';
import { DATE_FORMAT, DATE_FORMAT_DD_MM } from '@constants/date-format.ts';
import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useWindowWidth } from '@hooks/use-window-width.ts';

export const AchievementsWeekdayLoad = ({ data }: { data: TrainingLoad[] }) => {
    const weekdayData = sortDataByWeekdays(data);
    const [expandedWeeks, setExpandedWeeks] = useState<boolean[]>([]);
    const { isMobile } = useWindowWidth();

    const chunks = [];
    let chunk = [];

    for (let i = 0; i < data.length; i += 7) {
        chunk = data.slice(i, i + 7);
        chunks.push(chunk);
    }

    const getWeekRange = (weekData: TrainingLoad[]) => {
        const firstDay = weekData[0].date;
        const lastDay = weekData[6].date;
        return `${firstDay} - ${lastDay}`;
    };

    const handleClick = (index: number) => {
        setExpandedWeeks((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className='achievements-week__weekday-load'>
            {data.length <= 7 ? (
                <div className='achievements-week__week'>
                    <div className='achievements-week__weekday-title'>
                        Средняя силовая нагрузка по дням недели
                    </div>
                    {weekdayData.map((weekday, index) => (
                        <div className='achievements-week__weekday-item' key={weekday.weekday}>
                            <Badge
                                count={index + 1}
                                color={
                                    weekday.load
                                        ? 'var(--primary-light-blue)'
                                        : 'var(--primary-light)'
                                }
                                style={{ color: weekday.load ? '' : 'var(--primary-light-blue)' }}
                            />
                            <div className='achievements-week__content'>
                                <div className='achievements-week__weekday'>{weekday.weekday}</div>
                                <div className='achievements-week__load'>{`${weekday.load} кг`}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : isMobile ? (
                <div className='achievements-week__month'>
                    {chunks.map((weekData, index) => (
                        <div key={index} className='achievements-week__month-column'>
                            <div className='achievements-week__month-heading'>
                                Неделя {getWeekRange(weekData)}
                                <DownOutlined
                                    onClick={() => handleClick(index)}
                                    style={{
                                        transform: expandedWeeks[index]
                                            ? 'rotate(180deg)'
                                            : 'rotate(0deg)',
                                        marginLeft: '12px',
                                    }}
                                />
                            </div>
                            {expandedWeeks[index] && (
                                <>
                                    {weekData.map((weekday, idx) => (
                                        <div
                                            className='achievements-week__weekday-item'
                                            key={`${weekday.date}-${idx}`}
                                        >
                                            <Badge
                                                count={idx + 1}
                                                color={
                                                    weekday.load
                                                        ? 'var(--primary-light-blue)'
                                                        : 'var(--primary-light)'
                                                }
                                                style={{
                                                    color: weekday.load
                                                        ? ''
                                                        : 'var(--primary-light-blue)',
                                                }}
                                            />
                                            <div className='achievements-week__weekday'>
                                                {' '}
                                                {moment(weekday.date, DATE_FORMAT_DD_MM).format(
                                                    DATE_FORMAT,
                                                )}
                                            </div>
                                            <div className='achievements-week__load'>{`${weekday.load} кг`}</div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='achievements-week__month'>
                    {chunks.map((weekData, index) => (
                        <div key={index} className='achievements-week__month-column'>
                            <div className='achievements-week__month-heading'>
                                Неделя {getWeekRange(weekData)}
                            </div>
                            {weekData.map((weekday, idx) => (
                                <div
                                    className='achievements-week__weekday-item'
                                    key={`${weekday.date}-${idx}`}
                                >
                                    <Badge
                                        count={idx + 1}
                                        color={
                                            weekday.load
                                                ? 'var(--primary-light-blue)'
                                                : 'var(--primary-light)'
                                        }
                                        style={{
                                            color: weekday.load ? '' : 'var(--primary-light-blue)',
                                        }}
                                    />
                                    <div className='achievements-week__weekday'>
                                        {' '}
                                        {moment(weekday.date, DATE_FORMAT_DD_MM).format(
                                            DATE_FORMAT,
                                        )}
                                    </div>
                                    <div className='achievements-week__load'>{`${weekday.load} кг`}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
