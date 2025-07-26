import Link from 'next/link';

interface Post {
    title: string;
    url: string;
    description: string;
}

const posts: Post[] = [
    {
        title: 'The sixth iteration of my website',
        url: '/blog/new-website-v6',
        description:
            "Throughout my life, I've created a bunch of different websites with various designs, but none of them ever felt quite right for my personal page.",
    },
];

export default function Blog() {
    return (
        <div className="flex flex-col gap-4 pt-4">
            <h2 className="text-3xl font-bold">Blog posts</h2>
            {posts.map((post, index) => {
                return (
                    <div key={index}>
                        <Link className="hover:underline" href={post.url}>
                            <p className="font-bold text-primary">
                                {post.title}
                            </p>
                        </Link>
                        <p>{post.description}...</p>
                    </div>
                );
            })}
        </div>
    );
}
