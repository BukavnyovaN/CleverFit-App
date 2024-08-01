import { ReactNode } from 'react';

export type TabsItems = {
    id: string;
    label: string;
    key: string;
    children: ReactNode;
    badgeCount?: boolean;
    cardBg?: string;
};
