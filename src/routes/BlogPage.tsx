import {Link} from 'react-router-dom';
import {posts} from '@/data/blog-posts';

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function BlogPage() {
    return (
        <div className="flex w-full flex-col gap-12">
            <header className="flex flex-col gap-4">
                <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-primary">
                    blog
                </span>
                <h1 className="max-w-[12ch] text-[clamp(2.2rem,8vw,4rem)] font-bold leading-[0.96] text-foreground">
                    Notes from the workbench.
                </h1>
                <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
                    Short writeups about web tooling, infrastructure, Linux, and
                    whatever else survives the draft folder.
                </p>
            </header>

            <section className="rounded-xl bg-card p-5 shadow-sm ring-1 ring-border sm:p-6">
                <div className="flex flex-col divide-y divide-border">
                    {posts
                        .filter(post => !post.isArchived)
                        .map(post => (
                        <Link
                            key={post.url}
                            to={`/blog/${post.url}`}
                            className="group flex flex-col gap-2 py-4 text-inherit no-underline first:pt-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4"
                        >
                            <span className="flex flex-col gap-2">
                                <span className="flex items-center gap-2 font-bold text-foreground transition-colors group-hover:text-primary">
                                    {post.title}
                                    {post.isNew && (
                                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.7rem] font-medium text-primary">
                                            new
                                        </span>
                                    )}
                                </span>
                                <span className="text-sm leading-6 text-muted-foreground">
                                    {post.description}
                                </span>
                            </span>
                            <time
                                dateTime={post.publishedAt}
                                className="whitespace-nowrap text-xs text-muted-foreground"
                            >
                                {dateFormatter.format(
                                    new Date(post.publishedAt),
                                )}
                            </time>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
