import './globals.css';
import {Suspense} from 'react';
import {Metadata} from 'next';
import localFont from 'next/font/local';

export const metadata: Metadata = {
    title: 'kotleni`s web site',
    description: 'My own private web site.',
    metadataBase: new URL('https://kotleni.github.io'),
};

const mononokiFont = localFont({
    display: 'block',
    preload: true,
    fallback: ['monospace', 'Liberation Mono', 'SFMono-Regular', 'Consolas'],
    variable: '--font-mononoki',
    src: [
        {
            path: './fonts/mononoki-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './fonts/mononoki-Italic.woff2',
            weight: '400',
            style: 'italic',
        },
        {
            path: './fonts/mononoki-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
        {
            path: './fonts/mononoki-BoldItalic.woff2',
            weight: '700',
            style: 'italic',
        },
    ],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${mononokiFont.className} antialiased`}
        >
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
            </head>
            <body className="flex justify-center dark:bg-background">
                <Suspense>{children}</Suspense>
            </body>
        </html>
    );
}
