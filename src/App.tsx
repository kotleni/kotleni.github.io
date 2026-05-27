import {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {BlogPage} from '@/routes/BlogPage';
import {BlogPostPage} from '@/routes/BlogPostPage';
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
                <div className="w-full max-w-3xl px-5 sm:px-7">
                    <Routes>
                        <Route index element={<RootPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                    </Routes>
                </div>
            </RootLayoutContent>
        </TooltipProvider>
    );
}
