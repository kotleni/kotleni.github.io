import {PageNavigationLink} from '@/components/page-nav-link';
import {Link} from 'react-router-dom';
import RainOverlay from './rain-overlay';

interface NavLinkInfo {
    title: string;
    url: string;
}

const navLinks: NavLinkInfo[] = [
    {title: 'about', url: '/'},
    {title: 'blog', url: '/blog'},
];

export function RootLayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="flex min-h-screen w-full flex-col items-center">
                <header className="flex w-full max-w-3xl items-center justify-between px-5 pt-6 sm:px-7 sm:pt-8">
                    <Link
                        to="/"
                        className="text-[0.85rem] font-medium text-foreground no-underline transition-colors hover:text-primary"
                    >
                        kotleni
                    </Link>
                    <nav className="flex items-center gap-1">
                        {navLinks.map((link, index) => {
                            return (
                                <PageNavigationLink
                                    key={index}
                                    title={link.title}
                                    url={link.url}
                                />
                            );
                        })}
                    </nav>
                </header>
                <main className="flex w-full justify-center py-10 sm:py-14">
                    {children}
                </main>
            </div>
            <RainOverlay />
        </>
    );
}
