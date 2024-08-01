import { TabsItems } from '../../types/tabs-items.type.ts';
import './achievements-page.css';
import { Tabs } from 'antd';
import { AchievementsWeek } from '@components/achievements-week/achievements-week.tsx';
import { AchievementsMonth } from '@components/achievements-month/achievements-month.tsx';
import { StatsPeriod } from '../../enums/stats-period.enum.ts';

const achievementsTabsItems: TabsItems[] = [
    {
        id: StatsPeriod.week,
        label: 'За неделю',
        key: 'for-week',
        children: <AchievementsWeek />,
    },
    {
        id: StatsPeriod.month,
        label: 'За месяц',
        key: 'for-month',
        children: <AchievementsMonth />,
    },
    {
        id: 'all-time',
        label: 'За всё время (PRO)',
        key: 'for-all-time',
        children: <div>all time</div>,
    },
];

export const AchievementsPage = () => (
    <div className='achievements__wrapper'>
        <Tabs
            className='achievements__tabs'
            destroyInactiveTabPane={true}
            defaultActiveKey='1'
            items={achievementsTabsItems.map((tabItem) => {
                return {
                    label: tabItem.label,
                    key: tabItem.key,
                    children: tabItem.children,
                    disabled: tabItem.label === 'За всё время (PRO)',
                };
            })}
        ></Tabs>
    </div>
);
