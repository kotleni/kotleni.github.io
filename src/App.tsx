import {useEffect} from 'react';
import clsx from 'clsx';
import {House, NotebookText} from 'lucide-react';
import {Navigate, NavLink, Route, Routes, useLocation} from 'react-router-dom';
import RainOverlay from '@/components/RainOverlay';
import BlogPage from '@/routes/BlogPage';
import ReadPage from '@/routes/ReadPage';
import RootPage from '@/routes/RootPage';

const navigationItems = [
    {
        to: '/',
        label: 'Home',
        description: 'About and links',
        icon: House,
    },
    {
        to: '/blog',
        label: 'Blog',
        description: 'Posts and notes',
        icon: NotebookText,
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
        <main className="flex w-full justify-center px-3 pt-3.5 pb-14 md:px-[18px] md:pt-[26px]">
            <div className="flex w-full max-w-[1160px] flex-col gap-[22px]">
                <header className="relative grid gap-6 border border-line bg-panel px-[18px] py-6 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                    <div className="flex min-w-0 flex-col gap-2.5">
                        <NavLink
                            className="flex items-center gap-3.5 text-inherit no-underline hover:text-inherit"
                            to="/"
                        >
                            <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-black/20 bg-brand font-mono text-xl font-bold text-white dark:border-white/15">
                                K
                            </span>
                            <span className="flex min-w-0 flex-col gap-1">
                                <span className="font-mono text-[1.08rem] leading-none font-bold tracking-[0.03em]">
                                    kotleni&apos;s web
                                </span>
                                <span className="text-[0.84rem] text-muted-ink max-[560px]:hidden">
                                    personal corner on the internet
                                </span>
                            </span>
                        </NavLink>
                        <p className="m-0 max-w-[38rem] text-[0.92rem] text-muted-ink max-[560px]:hidden">
                            software, linux, infrastructure, and internet notes
                        </p>
                    </div>
                    <nav
                        className="flex flex-wrap justify-start gap-3 lg:justify-end max-[560px]:gap-2"
                        aria-label="Primary navigation"
                    >
                        {navigationItems.map(item => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    className={({isActive}) =>
                                        clsx(
                                            'inline-flex min-w-0 items-center gap-2.5 border border-line bg-panel-strong px-3.5 py-3 text-muted-ink no-underline transition hover:-translate-y-px hover:border-line-strong hover:text-ink max-[560px]:w-full max-[560px]:justify-start',
                                            isActive &&
                                                'border-ink bg-ink text-panel-strong',
                                        )
                                    }
                                >
                                    <Icon className="h-[18px] w-[18px] shrink-0" />
                                    <span className="flex flex-col gap-0.5">
                                        <span className="font-mono text-[0.92rem] leading-none">
                                            {item.label}
                                        </span>
                                        <span className="text-[0.74rem] leading-[1.1] opacity-80 max-[560px]:hidden">
                                            {item.description}
                                        </span>
                                    </span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </header>
                <div
                    key={location.pathname}
                    className="w-full animate-[fade-in_.32s_ease]"
                >
                    <Routes>
                        <Route path="/" element={<RootPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/blog/:postId" element={<ReadPage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
            <RainOverlay />
        </main>
    );
}
