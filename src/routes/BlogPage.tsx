import {Link} from 'react-router-dom';
import {posts} from '@/data/blog-posts';

export default function BlogPage() {
    return (
        <section className="relative flex flex-col gap-[26px] border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px]">
            <div className="max-w-[48rem]">
                <p className="mb-4 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                    Writing
                </p>
                <h1 className="mb-2.5 text-[clamp(2.8rem,6vw,5rem)] leading-[0.92] tracking-[-0.07em]">
                    posts.
                </h1>
                <p className="m-0 max-w-[70ch] text-[1rem] text-muted-ink">
                    Notes on engineering, infrastructure, Linux, and whatever I
                    am building or breaking at the moment.
                </p>
            </div>
            <div className="flex flex-col gap-3.5">
                {posts.map((post, index) => (
                    <Link to={`/blog/${post.url}`}>
                        <article
                            key={post.title}
                            className="grid gap-5 border border-line bg-panel-strong p-4 transition hover:translate-x-[5px] hover:border-line-strong max-[560px]:hover:translate-x-0 md:grid-cols-[92px_minmax(0,1fr)]"
                        >
                            <div className="flex flex-row items-center gap-2 md:flex-col md:items-start">
                                <span className="font-mono text-[0.74rem] tracking-[0.12em] text-muted-ink">
                                    {String(posts.length - index).padStart(
                                        2,
                                        '0',
                                    )}
                                </span>
                                {post.isNew ? (
                                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent">
                                        New!
                                    </span>
                                ) : null}
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                    <span className="text-[clamp(1.12rem,2vw,1.42rem)] leading-[1.15] font-bold text-inherit no-underline hover:text-brand-strong">
                                        {post.title}
                                    </span>
                                </div>
                                <p className="mt-2.5 mb-0 max-w-[62ch] text-muted-ink">
                                    {post.description}...
                                </p>
                            </div>
                        </article>
                    </Link>
                ))}
            </div>
        </section>
    );
}
