import {PageNavigationLink} from '@/components/page-nav-link';
import {Link} from 'react-router-dom';
import {SiteFooter} from '@/components/site-footer';
import {ThemeToggle} from '@/components/theme-toggle';
import {Ticker} from '@/components/ticker';

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
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 sm:px-6">
            <Ticker />
            <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-sm font-bold text-foreground no-underline"
                >
                    <span
                        aria-hidden="true"
                        className="win flex size-6 items-center justify-center text-[0.7rem]"
                    >
                        k
                    </span>
                    kotleni
                </Link>
                <div className="ml-auto flex items-center gap-1.5">
                    <nav className="flex items-center gap-1">
                        {navLinks.map(link => (
                            <PageNavigationLink
                                key={link.url}
                                title={link.title}
                                url={link.url}
                            />
                        ))}
                    </nav>
                    <ThemeToggle />
                </div>
            </header>
            <main className="flex-1 py-6">{children}</main>
            <SiteFooter />
        </div>
    );
}
