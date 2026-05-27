import {PageNavigationLink} from '@/components/page-nav-link';
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
            <div className="layout-shell">
                <header className="site-nav">
                    <div className="site-mark">kotleni</div>
                    <nav>
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
                <main className="site-main">{children}</main>
            </div>
            <RainOverlay />
        </>
    );
}
