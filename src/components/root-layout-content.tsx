import {Link} from 'react-router-dom';
import {ScrollToTop} from '@/components/scroll-to-top';
import {Sidebar} from '@/components/sidebar';
import {SiteFooter} from '@/components/site-footer';
import {ThemeToggle} from '@/components/theme-toggle';

export function RootLayoutContent({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="docs-page">
            <ScrollToTop />
            <a href="#main-content" className="docs-skip-link">
                skip to content
            </a>
            <header className="docs-topbar">
                <div className="docs-topbar-inner">
                    <Link to="/" className="docs-brand">
                        kotleni
                    </Link>
                    <ThemeToggle />
                </div>
            </header>
            <div className="docs-body">
                <div className="docs-layout">
                    <aside className="docs-side">
                        <Sidebar />
                    </aside>
                    <main id="main-content" className="docs-main">
                        {children}
                    </main>
                </div>
            </div>
            <SiteFooter />
        </div>
    );
}
