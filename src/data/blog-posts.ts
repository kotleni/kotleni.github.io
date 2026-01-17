export interface Post {
    title: string;
    url: string;
    isNew: boolean;
    description: string;
}

export const posts: Post[] = [
    {
        title: 'My hosting infrastructure',
        url: 'hosting-infrastructure',
        isNew: false,
        description:
            'For non-production purposes, I have two servers: a VPS from OVHCloud and a home lab with a single HP EliteDesk',
    },
    {
        title: 'Why i abandoned idea of using Asahi Linux',
        url: 'asahi-linux',
        isNew: false,
        description:
            "I am a Linux guy. I've used it on my VPS and home lab for years. On my desktop computer, I run Arch Linux exclusively, and I fully enjoy",
    },
    {
        title: 'The sixth iteration of my website',
        url: 'new-website-v6',
        isNew: false,
        description:
            "Throughout my life, I've created a bunch of different websites with various designs, but none of them ever felt quite right for my personal page",
    },
];
