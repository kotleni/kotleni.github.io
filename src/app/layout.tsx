'use client';

import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {cn} from '@/lib/utils';
import {Suspense} from 'react';
import {Outfit} from 'next/font/google';
import {usePathname, useSearchParams} from 'next/navigation';
import Link from 'next/link';
import {NavigationLink} from '@/components/navigation-link';
import {SidebarClose} from 'lucide-react';

// export const metadata: Metadata = {
//     title: 'kotleni`s private web site',
//     description: 'My own private web site.',
// };

const outfit = Outfit({
    subsets: ['latin'],
});

interface NavLinkInfo {
    title: string;
    url: string;
}

const navLinks: NavLinkInfo[] = [
    {title: 'about', url: '/'},
    {title: 'blog', url: '/blog'},
    {title: 'sandbox', url: '/sandbox'},
];

export default function RootLayout({
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
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>kotleni's web</title>
            </head>
            <body
                className={cn(
                    outfit.className,
                    'flex justify-center dark:bg-background',
                )}
            >
                <Suspense>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div
                            className={cn(
                                'flex flex-col',
                                isFullsized
                                    ? ''
                                    : 'md:container px-4 sm:px-12 md:px-28 lg:px-60 xl:px-72 2xl:px-99',
                            )}
                        >
                            <div
                                className="w-full bg-accent flex flex-row justify-center items-center gap-2 p-1"
                                hidden={isFullsized}
                            >
                                <p className="text-sm">
                                    I've launched a{' '}
                                    <Link
                                        className="text-primary hover:underline"
                                        href="/sandbox"
                                    >
                                        sandbox
                                    </Link>{' '}
                                    for experimental web projects.
                                </p>
                            </div>
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
                            <div hidden={!isFullsized} className="absolute p-4">
                                <Link href={ref ?? ''}>
                                    <SidebarClose
                                        className={cn(
                                            'hover:text-accent-foreground cursor-pointer',
                                            isDarkBg ? 'text-neutral-50' : '',
                                        )}
                                    />
                                </Link>
                            </div>
                            <main className={cn(isFullsized ? '' : 'pb-4')}>
                                {children}
                            </main>
                        </div>
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
}
