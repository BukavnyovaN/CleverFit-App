import React from 'react';
import { Badge, Button, Drawer } from 'antd';

import { menuItems } from '@utils/data/menu-items.tsx';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import logoMobile from '../../assets/images/logoMobile.png';

import './custom-drawer.css';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';
import { logout } from '@redux/slice/user/user-slice.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainings } from '@redux/actions/get-trainings.ts';
import { RequestResult } from '../../enums/request-result.enum.ts';
import { useGetAccessToken } from '@hooks/use-get-access-token.ts';
import { invitesSelector } from '@utils/helpers/selectors.ts';
import { getTrainingsList } from '@redux/actions/get-trainings-list.ts';

type CustomDrawerProps = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};

export const CustomDrawer: React.FC<CustomDrawerProps> = ({ collapsed, toggleCollapsed }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const accessToken = useGetAccessToken();

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
    const invites = useAppSelector(invitesSelector);

    return (
        <div className={collapsed ? 'drawer-collapsed' : 'drawer'}>
            <Drawer placement={'left'} closable={false} open={!collapsed} width={106} mask={false}>
                <div className='drawer__logo'>
                    <a href={PATHS.MAIN}>
                        <img
                            src={logoMobile}
                            alt={'CleverFit logo'}
                            className={'drawer__logo-mobile'}
                        />
                    </a>
                </div>
                <div className='drawer__content'>
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => menuAction(item.path)}
                            className='drawer__content-item'
                            data-test-id={item.dataTestId || ''}
                        >
                            {item.label === 'Тренировки' ? (
                                <Badge
                                    size={'small'}
                                    count={invites?.length}
                                    data-test-id='notification-about-joint-training'
                                >
                                    {item.label}
                                </Badge>
                            ) : (
                                item.label
                            )}
                        </div>
                    ))}
                </div>
                <div className='drawer__logout' onClick={logOut}>
                    Выход
                </div>
            </Drawer>
            <Button
                data-test-id='sider-switch-mobile'
                id={collapsed ? 'drawer__button-collapsed' : 'drawer__button'}
                type='text'
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
        </div>
    );
};
