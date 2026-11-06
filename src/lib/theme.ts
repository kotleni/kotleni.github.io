import {useCallback, useEffect, useState} from 'react';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

export const themePreferences: ThemePreference[] = ['light', 'dark', 'system'];

export const themeLabels: Record<ThemePreference, string> = {
    light: 'light',
    dark: 'dark',
    system: 'auto',
};

const storageKey = 'kotleni:theme';

const themeColors: Record<Theme, string> = {
    light: '#d4d0c6',
    dark: '#1a1a1a',
};

export function getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

export function readThemePreference(): ThemePreference {
    try {
        const stored = localStorage.getItem(storageKey);

        if (themePreferences.includes(stored as ThemePreference)) {
            return stored as ThemePreference;
        }
    } catch {
        return 'system';
    }

    return 'system';
}

export function writeThemePreference(preference: ThemePreference) {
    try {
        localStorage.setItem(storageKey, preference);
        return true;
    } catch {
        return false;
    }
}

export function applyTheme(theme: Theme) {
    const root = document.documentElement;

    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', themeColors[theme]);
}

export function useTheme() {
    const [preference, setPreference] =
        useState<ThemePreference>(readThemePreference);
    const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

    useEffect(() => {
        const media = window.matchMedia('(prefers-color-scheme: dark)');
        const syncSystemTheme = () =>
            setSystemTheme(media.matches ? 'dark' : 'light');

        media.addEventListener('change', syncSystemTheme);

        return () => media.removeEventListener('change', syncSystemTheme);
    }, []);

    const theme: Theme = preference === 'system' ? systemTheme : preference;

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    const updatePreference = useCallback((next: ThemePreference) => {
        setPreference(next);
        writeThemePreference(next);
    }, []);

    return {preference, theme, setPreference: updatePreference};
}
