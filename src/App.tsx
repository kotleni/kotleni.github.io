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
        <main className="main">
            <div className="site-frame">
                <header className="topbar">
                    <div className="topbar-primary">
                        <NavLink className="brand" to="/">
                            <span className="brand-mark">
                                <img
                                    className="page-icon"
                                    width="18"
                                    src="/favicon.svg"
                                    alt=""
                                />
                            </span>
                            <span className="brand-copy">
                                <span className="page-title">
                                    kotleni&apos;s web
                                </span>
                                <span className="page-subtitle">
                                    personal corner on the internet
                                </span>
                            </span>
                        </NavLink>
                        <p className="topbar-note">
                            software, linux, infrastructure, and internet notes
                        </p>
                    </div>
                    <nav className="navbar" aria-label="Primary navigation">
                        {navigationItems.map(item => {
                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    className={({isActive}) =>
                                        clsx('nav-link', {
                                            'nav-link-active': isActive,
                                        })
                                    }
                                >
                                    <Icon className="nav-icon" />
                                    <span className="nav-copy">
                                        <span className="nav-label">
                                            {item.label}
                                        </span>
                                        <span className="nav-description">
                                            {item.description}
                                        </span>
                                    </span>
                                </NavLink>
                            );
                        })}
                    </nav>
                </header>
                <div key={location.pathname} className="route-shell">
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
