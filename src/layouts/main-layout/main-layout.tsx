import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

import { HeaderLayout } from '../header-layout/header-layout.tsx';
import { Sidebar } from '../sidebar/sidebar.tsx';
import { CustomDrawer } from '../custom-drawer/custom-drawer.tsx';

import 'antd/dist/antd.css';
import './main-layout.css';
import { useWindowWidth } from '@hooks/use-window-width.ts';

const { Header, Content } = Layout;

export const MainLayout = ({ showHeader = true }) => {
    const [collapsed, setCollapsed] = useState<boolean>(true);
    const { isMobile } = useWindowWidth();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className='main-page'>
            {isMobile ? (
                <CustomDrawer collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            ) : (
                <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            )}
            <Layout style={{ background: 'none' }}>
                {showHeader && (
                    <Header style={{ padding: '0 24px', backgroundColor: '#F0F5FF' }}>
                        <HeaderLayout isMobile={isMobile} />
                    </Header>
                )}
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
