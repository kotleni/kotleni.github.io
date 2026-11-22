import {Link, useLocation} from 'react-router-dom';
import {PageNavigationLink} from '@/components/page-nav-link';
import {posts} from '@/data/blog-posts';

const sectionLinks = [
    {title: 'about', url: '/'},
    {title: 'links', url: '/links'},
];

export function Sidebar() {
    const {pathname} = useLocation();
    const visiblePosts = posts.filter(post => !post.isArchived);

    return (
        <>
            <nav className="docs-side-section" aria-label="Sections">
                <h2 className="docs-side-heading">General</h2>
                <ul className="docs-nav">
                    {sectionLinks.map(link => (
                        <li key={link.url}>
                            <PageNavigationLink
                                title={link.title}
                                url={link.url}
                            />
                        </li>
                    ))}
                </ul>
            </nav>
            <nav className="docs-side-section" aria-label="Posts">
                <h2 className="docs-side-heading">Posts</h2>
                <ul className="docs-nav">
                    {visiblePosts.map(post => {
                        const url = `/blog/${post.url}`;
                        const isActive = pathname === url;
                        return (
                            <li key={post.url}>
                                <Link
                                    to={url}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={
                                        isActive ? 'docs-nav-active' : undefined
                                    }
                                >
                                    {post.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
