import {cn} from '@/lib/utils';
import {ThemeProvider} from '@/components/theme-provider';
import {Snowflakes} from '@/components/decorations/christmas';
import {BackButton} from '@/components/back-button';
import {PageNavigationLink} from '@/components/page-nav-link';

interface NavLinkInfo {
    title: string;
    url: string;
}

const navLinks: NavLinkInfo[] = [
    {title: 'about', url: '/'},
    {title: 'projects', url: '/projects'},
    {title: 'blog', url: '/blog'},
    {title: 'sandbox', url: '/sandbox'},
];

export function RootLayoutContent({
    children,
    isFullsized,
}: Readonly<{
    children: React.ReactNode;
    isFullsized: boolean;
}>) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Snowflakes />
            {/*<Loading />*/}
            <div
                className={cn(
                    'flex flex-col',
                    isFullsized
                        ? ''
                        : 'w-full md:container px-4 sm:px-12 md:px-28 lg:px-60 xl:px-72 2xl:px-99',
                )}
            >
                <div
                    className="w-full bg-accent flex flex-row justify-center items-center gap-2 p-1"
                    hidden={isFullsized}
                >
                    <p className="text-sm">Happy new 2026 year! O.o</p>
                </div>
                <header
                    className="flex flex-row justify-end p-3 md:p-0"
                    hidden={isFullsized}
                >
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
                <div hidden={!isFullsized} className="absolute z-10 p-4">
                    <BackButton />
                </div>
                <div>
                    <main
                        className={cn(
                            isFullsized ? '' : 'pb-4',
                            'h-full flex flex-col',
                        )}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </ThemeProvider>
    );
}
