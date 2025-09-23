import {StyledLink} from '@/components/styled-link';

export default function Post() {
    return (
        <div className="flex flex-col gap-4 mt-2">
            <h1 className="font-bold text-3xl">
                The sixth iteration of my website.
            </h1>
            <section className="flex flex-col gap-1">
                <p className="text-foreground/80">
                    Throughout my life, I've created a bunch of different
                    websites with various designs, using different technologies
                    - but none of them ever felt quite right for my personal
                    page.
                </p>
            </section>
            <section className="flex flex-col gap-1">
                <p className="text-foreground/80">
                    You can find the source code for some of my previous
                    websites (different branches) in my GitHub{' '}
                    <StyledLink
                        href="https://github.com/kotleni/kotleni.github.io/"
                        title="repository"
                    />
                    .
                </p>
            </section>
            <section className="flex flex-col gap-1">
                <p className="text-foreground/80">
                    This is also the first public post I've ever written. I've
                    always maintained a micro-blogs in a social networks to
                    write about things, but it was never anything serious – just
                    pictures, memes, screenshots, links, and so on.
                </p>
            </section>
            <section className="flex flex-col gap-1">
                <h2 className="font-medium text-2xl">My brand new website</h2>
                <p className="text-foreground/80">
                    I really appreciate technical aesthetics in everything,
                    including web design. One of my previous and most favorite
                    websites was a personal page styled like documentation.
                    Therefore, in new website I made something simple, stylish
                    (in some way), and informative that also has additional
                    space for other content (like a blog, portfolio, projects,
                    and more).
                </p>
            </section>
            <section className="flex flex-col gap-1">
                <h2 className="font-medium text-2xl">Used technologies</h2>
                <p className="text-foreground/80">
                    First of all - I used TypeScript and React, because it's my
                    main stack.
                </p>
                <p className="pt-1 text-foreground/80">
                    But instead of Vite as bundler I created this project using
                    NextJS by several reasons:
                </p>
                <ol className="pl-1 text-foreground/80">
                    <li>
                        <p className="font-medium text-foreground/90">
                            1. Thoughts about the future
                        </p>
                        Maybe in the future I will add some dynamic features
                        (e.g., a view count for the blog).
                    </li>
                    <li>
                        <p className="font-medium text-foreground/90">
                            2. NextJS features for static sites
                        </p>
                        Initially, I'll host this site on GitHub Pages, so I
                        can't use server features. However, I can still use
                        awesome file-based routing, lazy image loading, and
                        more.
                    </li>
                    <li>
                        <p className="font-medium text-foreground/90">
                            3. Why not?
                        </p>
                        <p className="italic">
                            I pay the bills, so I can use whatever I want. Even
                            PHP if I feel like it.
                        </p>
                    </li>
                </ol>
            </section>
            <section className="flex flex-col gap-1">
                <h2 className="font-medium text-2xl">What's next?</h2>
                <p className="text-foreground/80">
                    Soon I will bring more stuff to this website, such like
                    portfolio, sandbox, extend blog features and more...
                </p>
                <p className="text-foreground/80">
                    And also I have some plans about start new pet project,
                    releasing one more package to npm and writing at least one
                    more blog post.
                </p>
                <p className="text-foreground/80">
                    Thanks for reading. Feel free to{' '}
                    <StyledLink
                        href="mailto:yavarenikya@gmail.com"
                        title="meow"
                    />{' '}
                    at me, or <StyledLink href="/" title="connect" /> elsewhere.
                </p>
            </section>
        </div>
    );
}
