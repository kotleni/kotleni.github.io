import {useEffect} from 'react';
import {House, NotebookText} from 'lucide-react';
import {NavLink, Route, Routes, useLocation} from 'react-router-dom';
import {RootPage} from '@/routes/RootPage';

interface NavigationPage {
    to: string;
    label: string;
}

const navigationItems: NavigationPage[] = [
    {
        to: '/',
        label: 'Home',
    },
    {
        to: '/notes',
        label: 'Notes',
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

    const location = useLocation();

    return (
        <main className="container md:px-8">
            <header>
                <div className="flex flex-row gap-2">
                    {navigationItems.map(navItem => (
                        <NavLink
                            className="text-primary hover:bg-primary hover:text-background"
                            key={navItem.to}
                            to={navItem.to}
                        >
                            {navItem.label}
                        </NavLink>
                    ))}
                </div>
            </header>
            <div>
                <Routes>
                    <Route path="/" element={<RootPage />} />
                </Routes>
            </div>
        </main>
    );
}
