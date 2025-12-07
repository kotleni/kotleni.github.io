'use client';

import {usePathname, useSearchParams} from 'next/navigation';
import {cn} from '@/lib/utils';
import {ThemeProvider} from '@/components/theme-provider';
import {Snowflakes} from '@/components/decorations/christmas';
import {NavigationLink} from '@/components/navigation-link';
import Link from 'next/link';
import {SidebarClose} from 'lucide-react';

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
                           }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname();
    const params = useSearchParams();
    const isFullsized = params.get('is_fullsized') === '1';
    const isDarkBg = params.get('is_darkbg') === '1';
    const ref = params.get('ref');

    return (
        <>
            <head>
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
                <title>kotleni's web</title>
            </head>
            <body
                className={cn(
                    // outfit.className,
                    'flex justify-center dark:bg-background',
                )}
            >
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Snowflakes />
                <div
                    className={cn(
                        'flex flex-col',
                        isFullsized
                            ? ''
                            : 'w-full md:container px-4 sm:px-12 md:px-28 lg:px-60 xl:px-72 2xl:px-99',
                    )}
                >
                    {/*<div*/}
                    {/*    className="w-full bg-accent flex flex-row justify-center items-center gap-2 p-1"*/}
                    {/*    hidden={isFullsized}*/}
                    {/*>*/}
                    {/*    <p className="text-sm">*/}
                    {/*        I've launched a{' '}*/}
                    {/*        <StyledLink href="/status">status</StyledLink>{' '}*/}
                    {/*        page to check my servers availability.*/}
                    {/*    </p>*/}
                    {/*</div>*/}
                    <header
                        className="flex flex-row justify-end p-3 md:p-0"
                        hidden={isFullsized}
                    >
                        <div className="flex flex-row gap-2">
                            {navLinks.map((link, index) => {
                                return (
                                    <NavigationLink
                                        key={index}
                                        title={link.title}
                                        url={link.url}
                                        isActive={pathName === link.url}
                                    />
                                );
                            })}
                        </div>
                    </header>
                    <div
                        hidden={!isFullsized}
                        className="absolute z-10 p-4"
                    >
                        <Link href={ref ?? ''}>
                            <SidebarClose
                                className={cn(
                                    'cursor-pointer',
                                    isDarkBg
                                        ? 'text-neutral-50 hover:text-neutral-400'
                                        : 'hover:text-accent-foreground',
                                )}
                            />
                        </Link>
                    </div>
                    <main
                        className={cn(
                            isFullsized ? '' : 'pb-4',
                            'h-full flex',
                        )}
                    >
                        {children}
                    </main>
                </div>
            </ThemeProvider>
            </body>
        </>
    );
}