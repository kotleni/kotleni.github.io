import Link from 'next/link';
import {FileText} from 'lucide-react';
import {ProjectCard} from '@/components/project-card';
import {ExperienceCard} from '@/components/experience-card';
import {BlockHeader} from '@/components/block-header';
import {AboutPart} from './about-part';
import {ExperiencePart} from '@/app/experience-part';
import {ProjectsPart} from '@/app/projects-part';

function LeftSide() {
    return (
        <div className="w-full md:w-[40%] md:flex-shrink-0">
            <div className="w-full md:w-[40%] p-(--blocks-padding) pt-4 md:pt-38 md:fixed md:top-0 md:max-h-screen">
                <Link
                    href="/"
                    className="text-4xl md:text-5xl font-bold text-slate-200"
                >
                    Viktor Varenik
                </Link>
                <h2 className="text-lg md:text-2xl font-medium mt-2 text-slate-200">
                    Full-stack Web Developer
                </h2>
                <p className="mt-3 leading-normal sm:w-[90%] md:w-[70%] lg:w-[50%]">
                    I build websites with NextJS, React, NestJS and Tailwind CSS
                    using TypeScript and WebStorm.
                </p>
            </div>
        </div>
    );
}

function RightSide() {
    return (
        <div className="w-full md:h-full pt-16 md:pt-24 p-(--blocks-padding) overflow-x-hidden">
            <AboutPart />
            <ExperiencePart />
            <ProjectsPart />

            <p className="mt-16 px-4 py-4 text-sm text-slate-500">
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
            <div className="w-full md:container xl:max-w-7xl md:flex md:flex-row md:items-start max-md:pt-8">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
}
