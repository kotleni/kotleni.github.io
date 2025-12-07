import {RootLayoutContent} from '@/components/root-layout-content';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <RootLayoutContent isFullsized={true}>{children}</RootLayoutContent>;
}
