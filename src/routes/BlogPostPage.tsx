import {useParams} from 'react-router-dom';
import {posts} from '@/data/blog-posts';
import {useEffect, useState} from 'react';
import {NotFoundPage} from '@/routes/NotFoundPage';
import {Panel} from '@/components/panel';

const postModules = import.meta.glob<{default: string}>('../markdown/*.md');

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function BlogPostPage() {
    const {slug} = useParams();
    const post = posts.find(item => item.url === slug);
    const [html, setHtml] = useState<string | undefined>(undefined);
    const [prevSlug, setPrevSlug] = useState(slug);

    if (slug !== prevSlug) {
        setPrevSlug(slug);
        setHtml(undefined);
    }

    const loader = slug ? postModules[`../markdown/${slug}.md`] : undefined;

    useEffect(() => {
        if (!slug) return;
        const current = postModules[`../markdown/${slug}.md`];
        if (!current) return;

        let cancelled = false;
        current().then(mod => {
            if (!cancelled) setHtml(mod.default);
        });
        return () => {
            cancelled = true;
        };
    }, [slug]);

    useEffect(() => {
        document.title = post ? `kotleni — ${post.title}` : 'kotleni';
    }, [post]);

    if (!post || !loader) {
        return <NotFoundPage />;
    }

    if (html === undefined) {
        return <div className="docs-dim">loading...</div>;
    }

    return (
        <div>
            <div className="docs-post-meta">
                <span />
                <time dateTime={post.publishedAt} className="docs-dim">
                    {dateFormatter.format(new Date(post.publishedAt))}
                </time>
            </div>

            <Panel title={post.url}>
                <div
                    className="docs-prose"
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </Panel>
        </div>
    );
}
