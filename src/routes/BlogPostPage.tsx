import {Link, useParams} from 'react-router-dom';
import {posts} from '@/data/blog-posts';
import asahiLinux from '@/markdown/asahi-linux.md';
import bakingMarkdownIntoHtml from '@/markdown/baking-markdown-into-html.md';
import hostingInfrastructure from '@/markdown/hosting-infrastructure.md';
import newWebsiteV6 from '@/markdown/new-website-v6.md';

const postHtml: Record<string, string> = {
    'asahi-linux': asahiLinux,
    'baking-markdown-into-html': bakingMarkdownIntoHtml,
    'hosting-infrastructure': hostingInfrastructure,
    'new-website-v6': newWebsiteV6,
};

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function BlogPostPage() {
    const {slug} = useParams();
    const post = posts.find(item => item.url === slug);
    const html = slug ? postHtml[slug] : undefined;

    if (!post || !html) {
        return (
            <div className="page-stack">
                <header className="page-header">
                    <p className="eyebrow">404</p>
                    <h1>Post not found.</h1>
                    <p>This one does not exist, or moved somewhere quieter.</p>
                </header>
                <Link to="/blog" className="text-link">
                    back to blog
                </Link>
            </div>
        );
    }

    return (
        <article className="page-stack">
            <header className="page-header">
                <Link to="/blog" className="text-link">
                    back to blog
                </Link>
                <time dateTime={post.publishedAt} className="eyebrow">
                    {dateFormatter.format(new Date(post.publishedAt))}
                </time>
                <h1>{post.title}</h1>
                <p>{post.description}</p>
            </header>

            <div
                className="markdown"
                dangerouslySetInnerHTML={{__html: html}}
            />
        </article>
    );
}
