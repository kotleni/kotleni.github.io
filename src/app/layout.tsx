'use client';

import {GithubLogo} from '@/icons/github-logo';
import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {cn} from '@/lib/utils';
import {Metadata} from 'next';
import {Suspense} from 'react';
import {Outfit} from 'next/font/google';

// export const metadata: Metadata = {
//     title: 'kotleni`s private web site',
//     description: 'My own private web site.',
// };

const outfit = Outfit({
    subsets: ['latin'],
});

interface NavigationLinkProps {
    isActive: boolean;
    title: string;
    url: string;
}

function NavigationLink({isActive, title, url}: NavigationLinkProps) {
    return (
        <a
            href={url}
            className={cn(
                'bold lg:p-2 hover:text-foreground',
                isActive ? '' : 'text-gray-700',
            )}
        >
            {title}
        </a>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>kotleni's web</title>
            </head>
            <body className={cn(outfit.className, 'dark:bg-slate-900')}>
                <Suspense>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="md:container md:px-48 flex flex-col p-4">
                            <header className="flex flex-row justify-end">
                                <div className="flex flex-row gap-2">
                                    <NavigationLink
                                        title="about"
                                        url="/"
                                        isActive={true}
                                    />
                                    <NavigationLink
                                        title="blog"
                                        url="/blog"
                                        isActive={false}
                                    />
                                    <NavigationLink
                                        title="projects"
                                        url="/projects"
                                        isActive={false}
                                    />
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
