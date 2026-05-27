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
                <header className="grid w-full max-w-3xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 pt-5">
                    <div></div>
                    <Link
                        to="/"
                        className="text-center text-[0.82rem] leading-8 text-muted-foreground no-underline hover:text-foreground"
                    >
                        kotleni
                    </Link>
                    <nav className="flex items-center justify-end gap-1">
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
                <main className="flex w-full justify-center py-12 sm:py-16">
                    {children}
                </main>
            </div>
            <RainOverlay />
        </>
    );
}
