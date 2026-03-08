export interface Social {
    name: string;
    icon: string | null;
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
            'Building web applications with React, Next.js, and TypeScript. I work on a diverse range of projects, from single-page apps to complex admin panels. Mainly as outsource.',
    },
    {
        title: 'Full-stack developer',
        companyName: 'Freelance',
        companyUrl: null,
        date: 'now 2024 - now',
        description:
            'As a freelance developer, I take full ownership of building modern web applications. I use a powerful stack including React, Svelte, Vue and TypeScript to deliver production-ready code for my clients.',
    },
    {
        title: 'Android&iOS developer',
        companyName: 'AppLead Pro & VIPAPP & Gravity',
        companyUrl: null,
        date: 'jan 2019 - dec 2024',
        description:
            'For more than four years, I was deeply immersed in native mobile development. This foundational chapter of my career was spent building, launching, and maintaining robust applications for both Android (Kotlin) and iOS (Swift).',
    },
];

export const helloLine = "Hey👋, I'm Viktor";
export const aboutMe =
    'I’m a full-stack developer passionate about software\n' +
    '                    freedom, creating and contributing to open source projects\n' +
    '                    that put users back in control of their data and technology.\n' +
    'I also enjoy coding in C/C++ for fun, and previously developed Android and iOS applications.';
export const myEmail = 'yavarenikya@gmail.com';
export const socials: Social[] = [
    {name: 'Email', icon: null, url: `mailto:${myEmail}`},
    {name: 'Github', icon: null, url: 'https://github.com/kotleni'},
    {name: 'Twitter', icon: null, url: 'https://x.com/kotleni_'},
    {name: 'Linkedin', icon: null, url: 'https://www.linkedin.com/in/kotleni/'},
    {
        name: 'Discord',
        icon: null,
        url: 'https://discord.com/users/420149869601357824',
    },
    {name: 'Telegram', icon: null, url: 'https://t.me/kotleni'},
];

export const skillsStack = [
    'javascript',
    'typescript',
    'html',
    'css',
    'reactjs',
    'vue',
    'svelte',
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
