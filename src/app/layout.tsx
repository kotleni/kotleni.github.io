import type {Metadata} from 'next';
import './globals.css';
import {NavigationLink} from '@/components/ui/navigation-link';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {ThemeProvider} from '@/components/theme-provider';

export const metadata: Metadata = {
    title: 'kotleni`s private web site',
    description: 'My own private web site.',
};

interface ConversationTarget {
    name: string;
    url: string;
}

const LeftSideBar = () => {
    return (
        <div className="w-70 h-full p-4 border-r-1 flex flex-col gap-2">
            <p>Good conversations is missing!</p>
            <p>
                If you are interested in communicating with me in English, write
                to me!
            </p>
            <Link
                href="mailto:yavarenikya@gmail.com"
                className="text-violet-400 hover:text-violet-500"
            >
                yavarenikya@gmail.com
            </Link>
            {[
                {name: 'Telegram', url: 'https://t.me/kotleni'},
                {name: 'Discord', url: 'https://discord.gg/kotleni'},
                {name: 'Email', url: 'mailto:yavarenikya@gmail.com'},
            ].map(target => (
                <Button variant="secondary" asChild key={target.name}>
                    <Link
                        href={target.url}
                        className="text-violet-400 hover:text-violet-500"
                    >
                        {target.name}
                    </Link>
                </Button>
            ))}
        </div>
    );
};

const NavigationBar = () => {
    return (
        <div className="h-14 flex items-center justify-center w-full border-b">
            <div className="w-8/10 sm:w-9/10 md:w-8/10 lg:w-8/10 h-full flex items-center p-8 gap-2">
                <div className="font-bold text-md">KOTLENI</div>
                <div className="w-full flex items-center justify-end gap-4">
                    <NavigationLink href="/" title="Home" />
                    <NavigationLink href="/" title="Articles" />
                    <NavigationLink href="/" title="Projects" />
                    <NavigationLink href="/" title="Sandbox" />
                    <NavigationLink href="/" title="About me" />
                </div>
            </div>
        </div>
    );
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
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavigationBar />
                    <div className="w-full h-full flex flex-row justify-center grow-rows-1">
                        <LeftSideBar />
                        <div className="container xl:max-w-300">{children}</div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
