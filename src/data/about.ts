import type {ComponentType, SVGProps} from 'react';
import DiscordIcon from '@/components/icons/DiscordIcon';
import GithubIcon from '@/components/icons/GithubIcon';
import LinkedinIcon from '@/components/icons/LinkedinIcon';
import TelegramIcon from '@/components/icons/TelegramIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';

type SocialIcon = ComponentType<SVGProps<SVGSVGElement>>;

export interface Social {
    name: string;
    icon: SocialIcon | null;
    url: string;
}

export interface Journey {
    title: string;
    companyName: string;
    companyUrl: string | null;
    date: string;
    description: string;
}

export const journeyItems: Journey[] = [
    {
        title: 'Front-end developer',
        companyName: 'Intetics Team',
        companyUrl: 'https://intetics.com/',
        date: 'nov 2024 - now',
        description:
            'Building web applications with React, Next.js, and TypeScript. I work on a diverse range of projects, from single-page apps to complex admin panels, mainly in outsource teams.',
    },
    {
        title: 'Full-stack developer',
        companyName: 'Freelance',
        companyUrl: null,
        date: 'nov 2024 - now',
        description:
            'As a freelance developer, I take full ownership of building modern web applications. I use a stack including React, Svelte, Vue, and TypeScript to deliver production-ready code for clients.',
    },
    {
        title: 'Android & iOS developer',
        companyName: 'AppLead Pro, VIPAPP, Gravity',
        companyUrl: null,
        date: 'jan 2019 - dec 2024',
        description:
            'For more than four years, I was deeply immersed in native mobile development, building, launching, and maintaining applications for both Android with Kotlin and iOS with Swift.',
    },
];

export const birthDate = new Date('2002-09-02');
export const aboutMe =
    "I'm a full-stack developer passionate about software freedom, creating and contributing to open source projects that put users back in control of their data and technology. I also enjoy coding in C/C++ for fun, and previously developed Android and iOS applications.";
export const myEmail = 'yavarenikya@gmail.com';

export const socials: Social[] = [
    {name: 'Github', icon: GithubIcon, url: 'https://github.com/kotleni'},
    {name: 'Twitter', icon: TwitterIcon, url: 'https://x.com/kotleni_'},
    {
        name: 'Linkedin',
        icon: LinkedinIcon,
        url: 'https://www.linkedin.com/in/kotleni/',
    },
    {
        name: 'Discord',
        icon: DiscordIcon,
        url: 'https://discord.com/users/420149869601357824',
    },
    {name: 'Telegram', icon: TelegramIcon, url: 'https://t.me/kotleni'},
];

export const skillsStack = [
    'javascript',
    'typescript',
    'html',
    'css',
    'reactjs',
    'vue',
    'nextjs',
    'nestjs',
    'expressjs',
    'tailwindcss',
    'sass',
    'prisma',
    'zod',
    'sql',
    'firebase',
    'mongodb',
    'git',
    'linux',
    'docker',
    'vercel',
    'biome',
    'eslint',
];

export const skillsStackAdditional = [
    'kotlin',
    'java',
    'swift',
    'clang',
    'c++',
    'python',
    'android',
    'ios',
];
