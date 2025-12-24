import {Title} from '@/components/title';
import Link from 'next/link';

interface Post {
    title: string;
    url: string;
    isNew: boolean;
    description: string;
}

const posts: Post[] = [
    {
        title: 'Why i abandoned idea of using Asahi Linux',
        url: '/blog/asahi-linux',
        isNew: true,
        description:
            "I am a Linux guy. I've used it on my VPS and home lab for years. On my desktop computer, I run Arch Linux exclusively, and I fully enjoy",
    },
    {
        title: 'The sixth iteration of my website',
        url: '/blog/new-website-v6',
        isNew: false,
        description:
            "Throughout my life, I've created a bunch of different websites with various designs, but none of them ever felt quite right for my personal page",
    },
];

export default function Blog() {
    return (
        <div className="flex flex-col gap-4 pt-4">
            <Title text="Blog posts" />
            {posts.map((post, index) => {
                return (
                    <div key={index}>
                        <div className="flex flex-row gap-2">
                            <Link className="hover:underline" href={post.url}>
                                <p className="font-bold text-primary">
                                    {post.title}
                                </p>
                            </Link>
                            <p
                                hidden={!post.isNew}
                                className="font-bold text-destructive"
                            >
                                New!
                            </p>
                        </div>
                        <p>{post.description}...</p>
                    </div>
                );
            })}
        </div>
    );
}
