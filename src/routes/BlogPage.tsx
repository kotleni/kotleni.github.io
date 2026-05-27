import {Link} from 'react-router-dom';
import {posts} from '@/data/blog-posts';

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function BlogPage() {
    return (
        <div className="page-stack">
            <header className="page-header">
                <p className="eyebrow">blog</p>
                <h1>Notes from the workbench.</h1>
                <p>
                    Short writeups about web tooling, infrastructure, Linux, and
                    whatever else survives the draft folder.
                </p>
            </header>

            <section className="post-list">
                {posts.map(post => (
                    <Link
                        key={post.url}
                        to={`/blog/${post.url}`}
                        className="post-row"
                    >
                        <span className="post-row-main">
                            <span className="post-row-title">
                                {post.title}
                                {post.isNew && (
                                    <span className="post-pill">new</span>
                                )}
                            </span>
                            <span className="post-row-description">
                                {post.description}
                            </span>
                        </span>
                        <time dateTime={post.publishedAt}>
                            {dateFormatter.format(new Date(post.publishedAt))}
                        </time>
                    </Link>
                ))}
            </section>
        </div>
    );
}
