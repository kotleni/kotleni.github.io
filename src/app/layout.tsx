'use client';

import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {cn} from '@/lib/utils';
import {Suspense} from 'react';
import {Outfit} from 'next/font/google';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {NavigationLink} from '@/components/navigation-link';

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
    // {title: 'portfolio', url: '/portfolio'},
];

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname();

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
                        <div className="md:container px-4 sm:px-12 md:px-28 lg:px-60 xl:px-72 2xl:px-99 flex flex-col">
                            <div className="w-full bg-accent flex flex-row justify-center items-center gap-2 p-1">
                                <p className="text-sm">
                                    I've launched a{' '}
                                    <Link
                                        className="text-primary hover:underline"
                                        href="/blog"
                                    >
                                        blog
                                    </Link>{' '}
                                    as my new experiment.
                                </p>
                            </div>
                            <header className="flex flex-row justify-end">
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
                            <main>{children}</main>
                        </div>
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
}
