import {Link} from 'react-router-dom';
import {posts} from '@/data/blog-posts';

export default function BlogPage() {
    return (
        <section className="container blog-page">
            <div className="page-hero">
                <p className="section-kicker">Writing</p>
                <h1 className="page-title-large">posts.</h1>
                <p className="section-copy">
                    Notes on engineering, infrastructure, Linux, and whatever I
                    am building or breaking at the moment.
                </p>
            </div>
            <div className="blog-list">
                {posts.map((post, index) => (
                    <article key={post.title} className="blog-item">
                        <div className="post-meta">
                            <span className="post-index">
                                {String(index + 1).padStart(2, '0')}
                            </span>
                            {post.isNew ? (
                                <span className="new-badge">New!</span>
                            ) : null}
                        </div>
                        <div className="post-main">
                            <div className="post-title-row">
                                <Link
                                    className="post-link"
                                    to={`/blog/${post.url}`}
                                >
                                    {post.title}
                                </Link>
                            </div>
                            <p className="post-description">
                                {post.description}...
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
