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
            <div className="flex flex-col">
                <header className="flex flex-row justify-end p-3 md:p-0">
                    <div className="flex flex-row gap-2">
                        {navLinks.map((link, index) => {
                            return (
                                <PageNavigationLink
                                    key={index}
                                    title={link.title}
                                    url={link.url}
                                />
                            );
                        })}
                    </div>
                </header>
                <div>
                    <main className="pb-4 h-full flex flex-col">
                        {children}
                    </main>
                </div>
            </div>
            <RainOverlay />
        </>
    );
}
