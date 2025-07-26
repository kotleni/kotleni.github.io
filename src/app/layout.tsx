'use client';

import './globals.css';
import {ThemeProvider} from '@/components/theme-provider';
import {cn} from '@/lib/utils';
import {Suspense} from 'react';
import {Outfit} from 'next/font/google';
import {usePathname} from 'next/navigation';

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
                isActive ? '' : 'text-muted-foreground',
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
                        <div className="md:container px-4 sm:px-12 md:px-28 lg:px-60 xl:px-72 2xl:px-99 flex flex-col p-4">
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
