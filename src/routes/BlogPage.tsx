import {Link} from 'react-router-dom';
import {Panel} from '@/components/panel';
import {posts} from '@/data/blog-posts';

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function BlogPage() {
    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-accent">blog</span>
                    <span aria-hidden="true">///</span>
                    <span>
                        {posts.filter(post => !post.isArchived).length} posts
                    </span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                    Notes from the workbench.
                </h1>
                <p className="max-w-prose text-muted-foreground">
                    Short writeups about web tooling, infrastructure, Linux, and
                    whatever else survives the draft folder.
                </p>
            </header>

            <Panel title="index.html">
                <ul className="flex flex-col divide-y divide-dashed divide-border">
                    {posts
                        .filter(post => !post.isArchived)
                        .map(post => (
                            <li key={post.url}>
                                <Link
                                    to={`/blog/${post.url}`}
                                    className="group flex items-start justify-between gap-4 py-3.5 text-inherit no-underline first:pt-0 last:pb-0"
                                >
                                    <span className="flex flex-col gap-1">
                                        <span className="flex flex-wrap items-baseline gap-x-2">
                                            <span className="font-bold text-foreground group-hover:text-accent group-hover:underline">
                                                {post.title}
                                            </span>
                                            {post.isNew && (
                                                <span className="blink text-accent">
                                                    *new
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            {post.description}
                                        </span>
                                    </span>
                                    <time
                                        dateTime={post.publishedAt}
                                        className="shrink-0 text-xs text-muted-foreground"
                                    >
                                        {dateFormatter.format(
                                            new Date(post.publishedAt),
                                        )}
                                    </time>
                                </Link>
                            </li>
                        ))}
                </ul>
            </Panel>
        </div>
    );
}
