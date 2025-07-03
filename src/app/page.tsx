import Link from 'next/link';
import {FileText} from 'lucide-react';
import {ProjectCard} from '@/components/project-card';
import {ExperienceCard} from '@/components/experience-card';
import {BlockHeader} from '@/components/block-header';

function LeftSide() {
    return (
        <div className="w-full">
            <div className="w-full md:w-[50%] p-(--blocks-padding) pt-4 md:pt-38 md:fixed md:top-0 md:max-h-screen">
                <Link
                    href="/"
                    className="text-4xl md:text-5xl font-bold text-slate-200"
                >
                    Viktor Varenik
                </Link>
                <h2 className="text-lg md:text-2xl font-medium mt-2 text-slate-200">
                    Full-stack Web Developer
                </h2>
                <p className="mt-3 leading-normal md:pr-64">
                    I build websites with NextJS, React, NestJS and Tailwind CSS
                    using TypeScript and WebStorm.
                </p>
            </div>
        </div>
    );
}

function AboutPart() {
    return (
        <>
            <BlockHeader title="About" />
            <p className="mb-4">
                Hi, I'm a software engineer, open-source enthusiast, and retro
                tech lover. Professionally, my journey began in mobile, where I
                spent three years building Android apps. In 2024, I brought that
                experience to the web, embracing a new set of challenges and
                technologies.
            </p>
            <p className="mb-4">
                This site has been my creative outlet for ten years, a place to
                share what I'm learning about code and my love for Linux. When
                I'm not at the keyboard, I'm probably playing retro games or
                contributing to an open-source project. (And for those
                wondering: yes, I use Arch, btw).
            </p>
        </>
    );
}

function ExperiencePart() {
    return (
        <>
            <BlockHeader title="Experience" />
            <ExperienceCard
                title="Mobile Developer"
                description="Before the penguin i was penguin Android Developer with big skill set in penguin for penguin people like you :3 BZLah blah. Even this placeholder was generated without any AI! It's just my crazy brain :3"
                startDate="2017"
                endDate="2024"
                tags={['kotlin', 'swift', 'android', 'ios', 'multiplatform']}
            />
            <ExperienceCard
                title="Trainee Full-stack Developer"
                description="My thoughts are not code, they are spaghetti. I am the sigma spaghetti chef with maximum gyatt for the fanum tax. My brain just goes brrrrr skibidi brrrr dop dop. This was written by a real human bean, no bots allowed in my brain rotisserie >:3 Rawr."
                startDate="2024"
                endDate="2025"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'tailwindcss',
                ]}
            />
            <ExperienceCard
                title="Freelance Full-stack Developer"
                description="My brain is just a void* pointing to a memory address that segfaults when you look at it too hard. I need write a bit more because this text is too short."
                startDate="2024"
                endDate="PRESENT"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'tailwindcss',
                ]}
            />
            <a
                href="/"
                className="flex flex-row justify-end gap-2 text-slate-400 px-8"
            >
                <p className="text-sm">Download resume (PDF)</p>
                <FileText className="size-5" />
            </a>
        </>
    );
}

function ProgectsPart() {
    return (
        <>
            <BlockHeader title="Projects" />
            <ProjectCard
                title="Private web site"
                description="Yes, it's really just site what u're see right now. I don't know if i can hold it anymore, but i really tired to update this. When i will be able to release it?"
                githubUrl="https://github.com/kotleni/kotleni.github.io"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'tailwindcss',
                ]}
            />
            <ProjectCard
                title="Pixel board"
                description="Online, real-time, multiplayer pixel board platform with public board to draw pixel art. Heavy inspired by Super Mario Bros. (not really)"
                githubUrl="https://github.com/kotleni/"
                tags={[
                    'nodejs',
                    'typescript',
                    'reactjs',
                    'nextjs',
                    'websockets',
                ]}
            />
        </>
    );
}

function RightSide() {
    return (
        <div className="w-full md:h-full pt-16 md:pt-24 p-(--blocks-padding) overflow-x-hidden">
            <AboutPart />
            <ExperiencePart />
            <ProgectsPart />

            <p className="mt-16 py-4 text-sm text-slate-500">
                Designed in Figma and coded in WebStorm with fun. Built with
                Next.js and Tailwind CSS, deployed with roockie (home-lab
                server). Heavily inspired by{' '}
                <Link
                    href="https://brittanychiang.com/"
                    className="font-medium text-slate-400 hover:text-teal-300"
                >
                    Brittany Chiang website
                </Link>
                .
            </p>
        </div>
    );
}

export default function Home() {
    return (
        <div className="w-full flex justify-center text-slate-400 overflow-x-hidden">
            <div className="w-full md:container xl:max-w-7xl md:flex md:flex-row md:items-start max-md:pt-8 gap-8">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
}
