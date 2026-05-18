import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {RootPage} from '@/routes/RootPage';
import {RootLayoutContent} from './components/root-layout-content';
import {TooltipProvider} from './components/ui/tooltip';

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
        <TooltipProvider>
            <RootLayoutContent>
                <div className="container px-2 md:px-24 lg:px-32">
                    <Routes>
                        <Route index element={<RootPage />} />
                    </Routes>
                </div>
            </RootLayoutContent>
        </TooltipProvider>
    );
}
