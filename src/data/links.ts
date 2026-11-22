export interface SiteLink {
    name: string;
    url: string;
    display: string;
}

const email = 'yavarenikya@gmail.com';

const socials = [
    {name: 'Github', url: 'https://github.com/kotleni'},
    {name: 'Linkedin', url: 'https://www.linkedin.com/in/kotleni/'},
    {name: 'Telegram', url: 'https://t.me/kotleni'},
    {name: 'X', url: 'https://x.com/kotleni_'},
];

export const linksIntro =
    'interested in a conversation? ask me anything about my work and projects.';

export const links: SiteLink[] = [
    ...socials.map(social => ({
        name: social.name.toLowerCase(),
        url: social.url,
        display: social.url.replace(/^https?:\/\//, '').replace(/\/$/, ''),
    })),
    {
        name: 'email',
        url: `mailto:${email}`,
        display: email,
    },
];
