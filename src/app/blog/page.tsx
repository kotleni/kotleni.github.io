import Link from 'next/link';

interface Post {
    title: string;
    url: string;
    description: string;
}

const posts: Post[] = [
    {
        title: 'How to cut bananas',
        url: '',
        description:
            'Gaming on Linux on M1 is here! We’re thrilled to release our Asahi game playing toolkit, which integrates our Vulkan 1.3 drivers with x86 emulation and Windows compatibility. Plus a bonus: conformant OpenCL 3.0…',
    },
    {
        title: 'Why its so important to you',
        url: '',
        description:
            'Finally, conformant Vulkan for the M1! The new Honeykrisp driver is the first conformant Vulkan® for Apple hardware on any operating system, implementing the full 1.3 spec without portability waivers…',
    },
    {
        title: 'Linux are most important stuff',
        url: '',
        description:
            'Upgrade your Asahi Linux systems, because your graphics drivers are getting a big boost: leapfrogging from OpenGL 2.1 over OpenGL 3.0 up to OpenGL 3.1! Similarly, the OpenGL ES 2.0 support is bumping up to OpenGL ES 3.0. That means more playable games and more functioning applications…',
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
                        <p>{post.description}</p>
                    </div>
                );
            })}
        </div>
    );
}
