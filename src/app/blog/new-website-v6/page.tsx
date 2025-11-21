'use client';

import {StyledLink} from '@/components/styled-link';
import {TextBlock} from '@/components/blog/text-block';
import {Title} from '@/components/blog/title';
import {OrderedList} from '@/components/blog/ordered-list';
import {useEffect, useState} from 'react';
import {EyeIcon} from 'lucide-react';
import {Skeleton} from '@/components/ui/skeleton';

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

interface ViewsReportResponse {
    count: number;
}

export default function Post() {
    const [viewsCount, setViewsCount] = useState(-1);

    const fetchViewsCountAndReport = async () => {
        const result = await fetch(
            'https://api.kotleni.pp.ua/views/report?pageId=test',
            {method: 'POST'},
        );
        console.log(result.body);
        const data = (await result.json()) as ViewsReportResponse;
        setViewsCount(data.count);
    };

    useEffect(() => {
        void fetchViewsCountAndReport();
    }, []);

    return (
        <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-row items-center gap-2">
                <EyeIcon />
                <p hidden={viewsCount < 0}>{viewsCount}</p>
                <Skeleton hidden={viewsCount >= 0} className="h-4 w-[25px]" />
            </div>
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
                    <StyledLink
                        href="https://github.com/kotleni/kotleni.github.io/"
                        title="repository"
                    />
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
                    <StyledLink
                        href="mailto:yavarenikya@gmail.com"
                        title="meow"
                    />{' '}
                    at me, or <StyledLink href="/" title="connect" /> elsewhere.
                </TextBlock>
            </section>
        </div>
    );
}
