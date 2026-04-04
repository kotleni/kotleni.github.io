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
        <div className="w-full">
            {loading ? (
                <div className="relative flex min-h-[280px] items-center justify-center border border-line bg-panel px-[18px] py-7 text-muted-ink shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px]">
                    Loading post...
                </div>
            ) : (
                <article className="relative grid gap-7 border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:grid-cols-[100px_minmax(0,1fr)] md:px-[30px]">
                    <div className="pt-2">
                        <span className="inline-block bg-brand px-2 py-[7px] font-mono text-[0.74rem] uppercase tracking-[0.12em] text-white">
                            Read
                        </span>
                    </div>
                    <div
                        className="markdown min-w-0 max-w-[72ch]"
                        dangerouslySetInnerHTML={{__html: html ?? ''}}
                    />
                </article>
            )}
        </div>
    );
}
