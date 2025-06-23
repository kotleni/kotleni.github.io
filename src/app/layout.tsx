import type {Metadata} from 'next';
import './globals.css';
import {NavigationLink} from '@/components/ui/navigation-link';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'kotleni`s private web site',
  description: 'My own private web site.',
};

const EventInfoBar = () => {
  return (
    <div className="w-full h-8 flex items-center justify-center bg-neutral-800 text-neutral-100 gap-1 p-4">
      I have published my first article on my blog! Check it out
      <Link className="text-blue-500" href="/">
        here
      </Link>
      .
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>kotleni's web</title>
      </head>
      <body>
        {/*<EventInfoBar />*/}
        <NavigationBar />
        <div className="w-full h-full overflow-x-clip">{children}</div>
      </body>
    </html>
  );
}
