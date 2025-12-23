import {StyledLink} from '@/components/styled-link';
import {TextBlock} from '@/components/blog/text-block';
import {Title} from '@/components/blog/title';
import {OrderedList} from '@/components/blog/ordered-list';
import {myEmail} from '@/data/about';

const nextjsReasons = [
    {
        title: '1. Thoughts about the future',
        content:
            'Maybe in the future I will add some dynamic features (e.g., a view count for the blog).',
    },
    {
        title: '2. NextJS features for static sites',
        content:
            "Initially, I'll host this site on GitHub Pages, so I can't use server features. However, I can still use awesome file-based routing, lazy image loading, and more.",
    },
    {
        title: '3. Why not?',
        content:
            'I pay the bills, so I can use whatever I want. Even PHP if I feel like it.',
    },
];

export default function Post() {
    return (
        <div className="flex flex-col gap-4 mt-2">
            {/*<ViewsCount size="default" />*/}
            <h1 className="font-bold text-3xl">
                The sixth iteration of my website.
            </h1>
            <section className="flex flex-col gap-1">
                <TextBlock>
                    Throughout my life, I've created a bunch of different
                    websites with various designs, using different technologies
                    - but none of them ever felt quite right for my personal
                    page.
                </TextBlock>
            </section>
            <section className="flex flex-col gap-1">
                <TextBlock>
                    You can find the source code for some of my previous
                    websites (different branches) in my GitHub{' '}
                    <StyledLink href="https://github.com/kotleni/kotleni.github.io/">
                        repository
                    </StyledLink>
                    .
                </TextBlock>
            </section>
            <section className="flex flex-col gap-1">
                <TextBlock>
                    This is also the first public post I've ever written. I've
                    always maintained a micro-blogs in a social networks to
                    write about things, but it was never anything serious – just
                    pictures, memes, screenshots, links, and so on.
                </TextBlock>
            </section>
            <section className="flex flex-col gap-1">
                <Title text="My brand new website" />
                <TextBlock>
                    I really appreciate technical aesthetics in everything,
                    including web design. One of my previous and most favorite
                    websites was a personal page styled like documentation.
                    Therefore, in new website I made something simple, stylish
                    (in some way), and informative that also has additional
                    space for other content (like a blog, portfolio, projects,
                    and more).
                </TextBlock>
            </section>
            <section className="flex flex-col gap-1">
                <Title text="Used technologies" />
                <TextBlock>
                    First of all - I used TypeScript and React, because it's my
                    main stack.
                </TextBlock>

                <TextBlock topPadding={1}>
                    But instead of Vite as bundler I created this project using
                    NextJS by several reasons:
                </TextBlock>
                <OrderedList items={nextjsReasons} />
            </section>
            <section className="flex flex-col gap-1">
                <Title text="What's next?" />
                <TextBlock>
                    Soon I will bring more stuff to this website, such like
                    portfolio, sandbox, extend blog features and more...
                </TextBlock>
                <TextBlock>
                    And also I have some plans about start new pet project,
                    releasing one more package to npm and writing at least one
                    more blog post.
                </TextBlock>
                <TextBlock>
                    Thanks for reading. Feel free to{' '}
                    <StyledLink href={`mailto:${myEmail}`}>meow</StyledLink> at
                    me, or <StyledLink href="/public">connect</StyledLink>{' '}
                    elsewhere.
                </TextBlock>
            </section>
        </div>
    );
}
