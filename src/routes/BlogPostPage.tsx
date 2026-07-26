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
                <header className="flex flex-col gap-4">
                    <span className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-primary">
                        404
                    </span>
                    <h1 className="max-w-[12ch] text-[clamp(2.2rem,8vw,4rem)] font-bold leading-[0.96] text-foreground">
                        Post not found.
                    </h1>
                    <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
                        This one does not exist, or moved somewhere quieter.
                    </p>
                </header>
                <Link
                    to="/blog"
                    className="text-primary no-underline transition-colors hover:underline"
                >
                    back to blog
                </Link>
            </div>
        );
    }

    return (
        <article className="flex w-full flex-col gap-12">
            <header className="flex flex-col gap-4">
                <Link
                    to="/blog"
                    className="text-primary no-underline transition-colors hover:underline"
                >
                    back to blog
                </Link>
                <time
                    dateTime={post.publishedAt}
                    className="inline-flex w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.08em] text-primary"
                >
                    {dateFormatter.format(new Date(post.publishedAt))}
                </time>
                <h1 className="max-w-[12ch] text-[clamp(2.2rem,8vw,4rem)] font-bold leading-[0.96] text-foreground">
                    {post.title}
                </h1>
                <p className="max-w-2xl text-[0.95rem] leading-7 text-muted-foreground">
                    {post.description}
                </p>
            </header>

            <div
                className="last:[&>*]:mb-0 [&_a]:text-primary [&_a]:transition-colors [&_a]:hover:underline [&_blockquote]:my-6 [&_blockquote]:rounded-r-lg [&_blockquote]:border-l-2 [&_blockquote]:border-primary/30 [&_blockquote]:bg-muted/50 [&_blockquote]:py-3 [&_blockquote]:pl-4 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.92em] [&_code]:text-muted-foreground [&_h1]:mb-5 [&_h1]:text-[clamp(2rem,6vw,3.2rem)] [&_h1]:leading-tight [&_h1]:text-foreground [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-[clamp(1.3rem,3.5vw,1.8rem)] [&_h2]:leading-tight [&_h2]:text-foreground [&_h3]:mb-3 [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:leading-tight [&_h3]:text-foreground [&_h4]:mb-2.5 [&_h4]:mt-6 [&_h4]:text-lg [&_h4]:leading-tight [&_h4]:text-foreground [&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border [&_li]:text-base [&_li]:leading-8 [&_li]:text-foreground [&_li+li]:mt-2 [&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:p-0 [&_p]:text-base [&_p]:leading-8 [&_p]:text-foreground [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-card [&_pre]:p-5 [&_pre]:ring-1 [&_pre]:ring-border [&_pre]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:text-foreground [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left [&_td]:rounded-md [&_td]:border [&_td]:border-border [&_td]:p-3 [&_th]:border [&_th]:border-border [&_th]:p-3 [&_th]:text-xs [&_th]:uppercase [&_th]:tracking-[0.08em] [&_thead]:bg-muted/60 [&_thead]:text-muted-foreground [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:p-0"
                dangerouslySetInnerHTML={{__html: html}}
            />
        </article>
    );
}
