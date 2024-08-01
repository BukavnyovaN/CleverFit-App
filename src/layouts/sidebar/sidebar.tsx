import React from 'react';

import Icon, { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Menu, Layout, Badge } from 'antd';

import { menuItems } from '@utils/data/menu-items.tsx';
import { ExitIconSvg } from '../../assets/icons/exit.tsx';
import logoCollapsed from '../../assets/images/logoColapsed.png';
import logoDefault from '../../assets/images/logoDefault.png';

import './sidebar.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { logout } from '@redux/slice/user/user-slice.ts';
import { getTrainings } from '@redux/actions/get-trainings.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { invitesSelector } from '@utils/helpers/selectors.ts';
import { getTrainingsList } from '@redux/actions/get-trainings-list.ts';

type SidebarProps = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};

const Sider = Layout.Sider;

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapsed }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const accessToken = useGetAccessToken();
    const invites = useAppSelector(invitesSelector);

    const logOut = () => {
        sessionStorage.clear();
        localStorage.clear();
        dispatch(logout());
        navigate(PATHS.AUTH);
    };

    const menuAction = async (menuItemPath: string) => {
        if (menuItemPath === PATHS.CALENDAR || menuItemPath === PATHS.TRAININGS) {
            const response = await dispatch(getTrainings({ accessToken })).unwrap();
            response === RequestResult.success ? navigate(menuItemPath) : navigate(PATHS.MAIN);
        } else if (menuItemPath === PATHS.PROFILE) {
            navigate(PATHS.PROFILE);
        } else if (menuItemPath === PATHS.ACHIEVEMENTS) {
            const getTrainingListResponse = await dispatch(
                getTrainingsList({ accessToken }),
            ).unwrap();
            const getUserTrainingResponse = await dispatch(getTrainings({ accessToken })).unwrap();
            getTrainingListResponse === RequestResult.success &&
            getUserTrainingResponse === RequestResult.success
                ? navigate(menuItemPath)
                : navigate(PATHS.MAIN);
        } else {
            navigate(PATHS.MAIN);
        }
    };

    return (
        <Sider theme='light' trigger={null} collapsed={collapsed} collapsedWidth={64} width={208}>
            <div className='sider__logo'>
                <a href={PATHS.MAIN}>
                    <img
                        src={collapsed ? logoCollapsed : logoDefault}
                        alt={'CleverFit logo'}
                        className={'sider__logo-default'}
                    />
                </a>
            </div>
            <Menu
                theme='light'
                mode='inline'
                items={menuItems.map((item) => ({
                    icon:
                        item.label === 'Тренировки' ? (
                            <Badge
                                size={'small'}
                                count={invites?.length}
                                data-test-id='notification-about-joint-training'
                            >
                                {item.icon}
                            </Badge>
                        ) : (
                            <div data-test-id={item.dataTestId || ''}>{item.icon}</div>
                        ),
                    label: item.label,
                    key: item.key,
                    onClick: () => menuAction(item.path),
                }))}
            />
            <div className='sider_logout-btn' onClick={logOut}>
                <Icon component={ExitIconSvg} style={{ height: '16px', width: '16px' }} />
                {collapsed ? '' : <p>Выход</p>}
            </div>
            <Button
                id='sider-button'
                type='text'
                data-test-id='sider-switch'
                icon={
                    collapsed ? (
                        <MenuUnfoldOutlined
                            style={{ height: '14px', width: '14px', color: '#8C8C8C' }}
                        />
                    ) : (
                        <MenuFoldOutlined
                            style={{ height: '14px', width: '14px', color: '#8C8C8C' }}
                        />
                    )
                }
                onClick={() => toggleCollapsed()}
            />
        </Sider>
    );
};
