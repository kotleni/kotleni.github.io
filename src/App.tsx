import React, {useEffect, useRef, useState} from 'react';
import {NavLink, Route, Routes, useLocation} from 'react-router-dom';
import {RootPage} from '@/routes/RootPage';
import { RootLayoutContent } from './components/root-layout-content';

interface NavigationPage {
    to: string;
    label: string;
    description: string;
}

const navigationItems: NavigationPage[] = [
    {
        to: '/',
        label: 'About',
        description: 'Information about myself.',
    },
    {
        to: '/notes',
        label: 'Notes',
        description: 'Short writings that I wrote.',
    },
];

function usePreferredDarkMode() {
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const syncTheme = (isDark: boolean) => {
            document.documentElement.classList.toggle('dark', isDark);
        };

        syncTheme(mediaQuery.matches);

        const handleChange = (event: MediaQueryListEvent) => {
            syncTheme(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);
}

export default function App() {
    usePreferredDarkMode();

    return (
        <RootLayoutContent>
            <div>
                <Routes>
                    <Route index element={<RootPage />} />
                </Routes>
            </div>
        </RootLayoutContent>
    );
}
