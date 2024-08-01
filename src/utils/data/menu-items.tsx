import { CalendarTwoTone, HeartFilled, IdcardOutlined, TrophyFilled } from '@ant-design/icons';
import { PATHS } from '@constants/paths.ts';

export const menuItems = [
    {
        key: '1',
        icon: (
            <CalendarTwoTone
                twoToneColor={'#061178'}
                style={{ color: '#061178', height: '16px', width: '16px' }}
            />
        ),
        path: PATHS.CALENDAR,
        label: 'Календарь',
        id: 'menu-item',
    },
    {
        key: '2',
        icon: <HeartFilled style={{ color: '#061178', height: '16px', width: '16px' }} />,
        path: PATHS.TRAININGS,
        label: 'Тренировки',
        id: 'menu-item',
    },
    {
        key: '3',
        icon: <TrophyFilled style={{ color: '#061178', height: '16px', width: '16px' }} />,
        path: PATHS.ACHIEVEMENTS,
        label: 'Достижения',
        id: 'menu-item',
        dataTestId: 'sidebar-achievements',
    },
    {
        key: '4',
        icon: <IdcardOutlined style={{ color: '#061178', height: '16px', width: '16px' }} />,
        path: PATHS.PROFILE,
        label: 'Профиль',
        id: 'menu-item',
    },
];
