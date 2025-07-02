import {ThemeProvider} from '@/components/theme-provider';
import {Metadata} from 'next';
import './globals.css';
import DynamicBackground from '@/components/dynamic-bg';

export const metadata: Metadata = {
    title: 'kotleni`s private web site',
    description: 'My own private web site.',
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
            <body className="bg-slate-900 font-sans">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="relative isolate min-h-screen w-full">
                        <DynamicBackground />
                        <main className="relative z-10">{children}</main>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
