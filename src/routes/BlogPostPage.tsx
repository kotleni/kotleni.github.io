import {Link, useParams} from 'react-router-dom';
import {posts} from '@/data/blog-posts';
import asahiLinux from '@/markdown/asahi-linux.md';
import bakingMarkdownIntoHtml from '@/markdown/baking-markdown-into-html.md';
import hostingInfrastructure from '@/markdown/hosting-infrastructure.md';
import newWebsiteV6 from '@/markdown/new-website-v6.md';

const postHtml: Record<string, string> = {
    'asahi-linux': asahiLinux,
    'baking-markdown-into-html': bakingMarkdownIntoHtml,
    'hosting-infrastructure': hostingInfrastructure,
    'new-website-v6': newWebsiteV6,
};

const dateFormatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

export function BlogPostPage() {
    const {slug} = useParams();
    const post = posts.find(item => item.url === slug);
    const html = slug ? postHtml[slug] : undefined;

    if (!post || !html) {
        return (
            <div className="flex w-full flex-col gap-12">
                <header className="flex flex-col gap-3.5">
                    <p className="text-xs uppercase tracking-[0.12em] text-primary">
                        404
                    </p>
                    <h1 className="max-w-[12ch] text-[clamp(2.35rem,9vw,4.5rem)] font-bold leading-[0.96] text-foreground">
                        Post not found.
                    </h1>
                    <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                        This one does not exist, or moved somewhere quieter.
                    </p>
                </header>
                <Link
                    to="/blog"
                    className="text-primary no-underline hover:bg-primary hover:text-background"
                >
                    back to blog
                </Link>
            </div>
        );
    }

    return (
        <article className="flex w-full flex-col gap-12">
            <header className="flex flex-col gap-3.5">
                <Link
                    to="/blog"
                    className="text-primary no-underline hover:bg-primary hover:text-background"
                >
                    back to blog
                </Link>
                <time
                    dateTime={post.publishedAt}
                    className="text-xs uppercase tracking-[0.12em] text-primary"
                >
                    {dateFormatter.format(new Date(post.publishedAt))}
                </time>
                <h1 className="max-w-[12ch] text-[clamp(2.35rem,9vw,4.5rem)] font-bold leading-[0.96] text-foreground">
                    {post.title}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                    {post.description}
                </p>
            </header>

            <div
                className="last:[&>*]:mb-0 [&_a]:text-primary [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-muted-foreground [&_h1]:mb-5 [&_h1]:text-[clamp(2.1rem,7vw,3.6rem)] [&_h1]:leading-tight [&_h1]:text-foreground [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[clamp(1.45rem,4vw,2rem)] [&_h2]:leading-tight [&_h2]:text-foreground [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:leading-tight [&_h3]:text-foreground [&_h4]:mb-2.5 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:leading-tight [&_h4]:text-foreground [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-muted [&_li]:text-base [&_li]:leading-8 [&_li]:text-foreground [&_li+li]:mt-2 [&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:p-0 [&_p]:text-base [&_p]:leading-8 [&_p]:text-foreground [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:p-5 [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:text-foreground [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_td]:border [&_td]:border-muted [&_td]:p-3 [&_th]:border [&_th]:border-muted [&_th]:p-3 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-[0.08em] [&_thead]:bg-muted [&_thead]:text-muted-foreground [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:p-0"
                dangerouslySetInnerHTML={{__html: html}}
            />
        </article>
    );
}
