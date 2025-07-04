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
                Hi, I'm a software engineer, open-source enthusiast, and tech
                lover. Professionally, my journey began in mobile, where I spent
                three years building Android apps. In 2024, I brought that
                experience to the web, embracing a new set of challenges and
                technologies.
            </p>
            <p className="mb-4">
                My transition to the web has been an exciting deep-dive into the
                modern JavaScript ecosystem. I'm currently focused on
                technologies like React, Next.js, and TypeScript, and I'm always
                eager to learn what's next. I believe that staying curious is
                key to growth, and I actively seek out new tools and frameworks
                that can help me build better, faster, and more reliable
                applications.
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
                description="For more than three years, I was deeply immersed in native mobile development. This foundational chapter of my career was spent building, launching, and maintaining robust applications for both Android (Kotlin) and iOS (Swift)."
                startDate="2017"
                endDate="2024"
                tags={['kotlin', 'swift', 'android', 'ios', 'multiplatform']}
            />
            <ExperienceCard
                title="Freelance Full-stack Developer"
                description="As a freelance developer, I take full ownership of building modern web applications. I use a powerful stack including React, Node.js, and TypeScript to deliver production-ready code for my clients."
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
            {/*<ExperienceCard*/}
            {/*    title="Trainee Full-stack Developer"*/}
            {/*    description=""*/}
            {/*    startDate="2024"*/}
            {/*    endDate="2025"*/}
            {/*    tags={[*/}
            {/*        'nodejs',*/}
            {/*        'typescript',*/}
            {/*        'reactjs',*/}
            {/*        'nextjs',*/}
            {/*        'tailwindcss',*/}
            {/*    ]}*/}
            {/*/>*/}
            <a
                href="/"
                hidden={true}
                className="flex flex-row justify-end gap-2 text-slate-400 px-8"
            >
                <p className="text-sm">Download resume (PDF)</p>
                <FileText className="size-5" />
            </a>
        </>
    );
}

function ProjectsPart() {
    return (
        <>
            <BlockHeader title="Projects" />
            <ProjectCard
                title="Private web site"
                description="This portfolio is a live project I designed and built from the ground up. It serves as a practical showcase of my skills in creating modern, responsive, and performant web applications using Next.js, React, TypeScript, and Tailwind CSS."
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
                title="PixelDash"
                description="Create, collaborate, and compete on a massive open-source pixel canvas platform. This project goes beyond traditional pixel boards by allowing users to own territory, protect their art, and even import images to bring their vision to life."
                githubUrl="https://github.com/kotleni/pixel-dash"
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
            <ProjectsPart />

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
