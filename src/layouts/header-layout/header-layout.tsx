import React from 'react';
import { ArrowLeftOutlined, SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button } from 'antd';
import './header-layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { PATHS } from '@constants/paths.ts';

type HeaderLayoutProps = {
    isMobile: boolean;
};

export const HeaderLayout: React.FC<HeaderLayoutProps> = ({ isMobile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isMainPage = location.pathname === PATHS.MAIN;
    const isFeedbackPage = location.pathname === PATHS.FEEDBACKS;
    const isCalendarPage = location.pathname === PATHS.CALENDAR;
    const isProfilePage = location.pathname === PATHS.PROFILE;
    const isSettingsPage = location.pathname === PATHS.SETTINGS;
    const isTrainingsPage = location.pathname === PATHS.TRAININGS;
    const isAchievementsPage = location.pathname === PATHS.ACHIEVEMENTS;

    return (
        <div className='header__wrapper'>
            <div className='header-profile__wrapper'>
                {isSettingsPage ? (
                    <div className='header-setting__wrapper'>
                        <ArrowLeftOutlined
                            data-test-id='settings-back'
                            style={{ width: '14px' }}
                            onClick={() => navigate(location.state)}
                        />
                        Настройки
                    </div>
                ) : (
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link to={PATHS.MAIN}>Главная</Link>
                        </Breadcrumb.Item>
                        {isFeedbackPage && (
                            <Breadcrumb.Item>
                                <Link to={PATHS.FEEDBACKS}>Отзывы пользователей</Link>
                            </Breadcrumb.Item>
                        )}
                        {isCalendarPage && (
                            <Breadcrumb.Item>
                                <Link to={PATHS.CALENDAR}>Календарь</Link>
                            </Breadcrumb.Item>
                        )}
                        {isProfilePage && (
                            <Breadcrumb.Item>
                                <Link to={PATHS.PROFILE}>Профиль</Link>
                            </Breadcrumb.Item>
                        )}
                        {isTrainingsPage && (
                            <Breadcrumb.Item>
                                <Link to={PATHS.TRAININGS}>Тренировки</Link>
                            </Breadcrumb.Item>
                        )}
                        {isAchievementsPage && (
                            <Breadcrumb.Item>
                                <Link to={PATHS.ACHIEVEMENTS}>Достижения</Link>
                            </Breadcrumb.Item>
                        )}
                    </Breadcrumb>
                )}
                {(isProfilePage || isAchievementsPage || isTrainingsPage) &&
                    (!isMobile ? (
                        <div
                            className='header-profile__settings'
                            data-test-id='header-settings'
                            onClick={() => navigate(PATHS.SETTINGS, { state: location.pathname })}
                        >
                            <SettingOutlined />
                            <div>Настройки</div>
                        </div>
                    ) : (
                        <Button
                            className='header-profile__settings'
                            type='default'
                            shape='circle'
                            onClick={() => navigate(PATHS.SETTINGS, { state: location.pathname })}
                            icon={
                                <SettingOutlined
                                    style={{ height: '14px', width: '14px', color: '#000000' }}
                                />
                            }
                        />
                    ))}
            </div>
            {isMainPage && (
                <div className='header__content'>
                    <h1 className='header__heading'>
                        Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться
                        своей мечты!
                    </h1>
                    <div
                        data-test-id='header-settings'
                        onClick={() => navigate(PATHS.SETTINGS, { state: location.pathname })}
                    >
                        {isMobile ? (
                            <Button
                                className='header-profile__settings'
                                type='default'
                                shape='circle'
                                onClick={() =>
                                    navigate(PATHS.SETTINGS, { state: location.pathname })
                                }
                                icon={
                                    <SettingOutlined
                                        style={{ height: '14px', width: '14px', color: '#000000' }}
                                    />
                                }
                            />
                        ) : (
                            <div className='header__settings'>
                                <SettingOutlined />
                                <div>Настройки</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
