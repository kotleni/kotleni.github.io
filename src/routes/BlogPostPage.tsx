import {Link, useParams} from 'react-router-dom';
import {posts} from '@/data/blog-posts';
import {useEffect, useState} from 'react';
import {cn} from '@/lib/utils';
import {Panel} from '@/components/panel';

const postModules = import.meta.glob<{default: string}>('../markdown/*.md');

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

const proseTypography = cn(
    '[&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:sm:text-3xl',
    '[&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:leading-tight',
    '[&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-bold',
    '[&_h4]:mb-2 [&_h4]:mt-5 [&_h4]:font-bold',
    '[&_p]:leading-7',
    '[&_li]:leading-7',
    '[&_li+li]:mt-1',
    '[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal [&_ol]:p-0',
    '[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc [&_ul]:p-0',
    '[&_blockquote]:my-5 [&_blockquote]:border-l-2 [&_blockquote]:border-accent',
    '[&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_blockquote]:italic',
    '[&_a]:text-accent [&_a]:underline [&_a]:decoration-dotted [&_a]:underline-offset-2',
    'last:[&>*]:mb-0',
);

const proseCode = cn(
    '[&_code]:well [&_code]:px-1 [&_code]:text-[0.85em]',
    '[&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:well',
    '[&_pre]:p-4 [&_pre]:text-[0.85rem] [&_pre]:leading-6',
    '[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-0',
    '[&_pre_code]:text-[1em] [&_pre_code]:shadow-[none]',
);

const proseMisc = cn(
    '[&_hr]:my-8 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-dashed [&_hr]:border-border',
    '[&_strong]:text-foreground',
    '[&_img]:my-5 [&_img]:border [&_img]:border-border',
    '[&_table]:my-5 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm',
    '[&_td]:border [&_td]:border-border [&_td]:p-2',
    '[&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-2',
    '[&_th]:text-xs [&_th]:uppercase [&_th]:tracking-[0.1em]',
);

export function BlogPostPage() {
    const {slug} = useParams();
    const post = posts.find(item => item.url === slug);
    const [html, setHtml] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setHtml(undefined);
        setLoading(true);

        if (!slug) {
            setLoading(false);
            return;
        }

        const loader = postModules[`../markdown/${slug}.md`];
        if (!loader) {
            setLoading(false);
            return;
        }

        loader()
            .then(mod => setHtml(mod.default))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <div className="text-muted-foreground">loading...</div>;
    }

    if (!post || !html) {
        return (
            <div className="flex flex-col gap-6">
                <header className="flex flex-col gap-3">
                    <span className="text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                        error 404
                    </span>
                    <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                        Post not found.
                    </h1>
                    <p className="max-w-prose text-muted-foreground">
                        This one does not exist, or moved somewhere quieter.
                    </p>
                </header>
                <Link
                    to="/blog"
                    className="w-fit text-accent underline decoration-dotted underline-offset-2 no-underline hover:decoration-solid"
                >
                    [ back to index ]
                </Link>
            </div>
        );
    }

    const position = posts.findIndex(item => item.url === post.url);
    const older = posts[position + 1];
    const newer = posts[position - 1];

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[0.7rem] uppercase tracking-[0.14em]">
                <Link
                    to="/blog"
                    className="text-muted-foreground no-underline hover:text-accent hover:underline"
                >
                    [ back to index ]
                </Link>
                <time
                    dateTime={post.publishedAt}
                    className="text-muted-foreground"
                >
                    {dateFormatter.format(new Date(post.publishedAt))}
                </time>
            </div>

            <Panel title={`${post.url}.md`}>
                <div
                    className={cn(proseTypography, proseCode, proseMisc)}
                    dangerouslySetInnerHTML={{__html: html}}
                />
            </Panel>

            <nav className="flex flex-wrap items-center justify-between gap-2 border-t border-dashed border-border pt-4 text-[0.7rem] uppercase tracking-[0.14em]">
                {older ? (
                    <Link
                        to={`/blog/${older.url}`}
                        className="text-muted-foreground no-underline hover:text-accent hover:underline"
                    >
                        &lt;&lt; {older.title}
                    </Link>
                ) : (
                    <span />
                )}
                {newer && (
                    <Link
                        to={`/blog/${newer.url}`}
                        className="text-muted-foreground no-underline hover:text-accent hover:underline"
                    >
                        {newer.title} &gt;&gt;
                    </Link>
                )}
            </nav>
        </div>
    );
}
