import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

const markdownModules = import.meta.glob('../markdown/*.md', {
    import: 'default',
}) as Record<string, () => Promise<string>>;

export default function ReadPage() {
    const {postId} = useParams<{postId: string}>();
    const [html, setHtml] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadPost = async () => {
            setLoading(true);

            const loader = postId
                ? markdownModules[`../markdown/${postId}.md`]
                : undefined;

            if (!loader) {
                if (!cancelled) {
                    setHtml('<h1>Post not found</h1>');
                    setLoading(false);
                }
                return;
            }

            try {
                const content = await loader();

                if (!cancelled) {
                    setHtml(content);
                }
            } catch (error) {
                console.error(error);

                if (!cancelled) {
                    setHtml('<h1>Post not found</h1>');
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadPost();

        return () => {
            cancelled = true;
        };
    }, [postId]);

    return (
        <div className="post-container">
            {loading ? (
                <div className="post-shell loading">Loading post...</div>
            ) : (
                <article className="post-shell post-card">
                    <div className="reading-rail">
                        <span className="reading-label">Read</span>
                    </div>
                    <div
                        className="blog-post"
                        dangerouslySetInnerHTML={{__html: html ?? ''}}
                    />
                </article>
            )}
        </div>
    );
}
