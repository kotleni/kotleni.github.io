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
            <header className="flex flex-col gap-3.5">
                <p className="text-xs uppercase tracking-[0.12em] text-primary">
                    blog
                </p>
                <h1 className="max-w-[12ch] text-[clamp(2.35rem,9vw,4.5rem)] font-bold leading-[0.96] text-foreground">
                    Notes from the workbench.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                    Short writeups about web tooling, infrastructure, Linux, and
                    whatever else survives the draft folder.
                </p>
            </header>

            <section className="border-y border-border">
                {posts.map(post => (
                    <Link
                        key={post.url}
                        to={`/blog/${post.url}`}
                        className="group grid grid-cols-[1fr_auto] gap-4 border-t border-border py-4 text-inherit no-underline first:border-t-0 max-sm:grid-cols-1 max-sm:gap-2"
                    >
                        <span className="flex flex-col gap-2">
                            <span className="flex items-center gap-2 font-bold text-foreground group-hover:text-primary">
                                {post.title}
                                {post.isNew && (
                                    <span className="rounded-sm border border-border px-1.5 py-0.5 text-[0.7rem] font-bold text-primary">
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
                            {dateFormatter.format(new Date(post.publishedAt))}
                        </time>
                    </Link>
                ))}
            </section>
        </div>
    );
}
