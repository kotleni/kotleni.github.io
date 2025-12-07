import './globals.css';
import {Suspense} from 'react';
import {RootLayoutContent} from '@/components/root-layout-content';
import {Metadata} from 'next';

export const metadata: Metadata = {
    title: 'kotleni`s web site',
    description: 'My own private web site.',
    metadataBase: new URL("https://kotleni.github.io"),
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
                <title>kotleni's web</title>
            </head>
            <Suspense>
                <RootLayoutContent>{children}</RootLayoutContent>
            </Suspense>
        </html>
    );
}
