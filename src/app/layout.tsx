import 'highlight.js/styles/github-dark.css';
import './globals.css';
import {Suspense} from 'react';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'kotleni`s web site',
    description: 'My own private web site.',
    metadataBase: new URL('https://kotleni.github.io'),
};

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
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
                <title>kotleni's web</title>
            </head>
            <body className="flex justify-center dark:bg-background">
                <Suspense>{children}</Suspense>
            </body>
        </html>
    );
}
