'use client';

import {SocialIcon} from '@/components/social-icon';
import {Badge} from '@/components/ui/badge';
import {GithubLogo} from '@/icons/github-logo';
import {GmailLogo} from '@/icons/gmail-logo';
import {LinkedinLogo} from '@/icons/linkedin-logo';
import {TelegramLogo} from '@/icons/telegram-logo';
import Avatar from '@/kotleni2.jpg';
import {cn} from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import {useRef, useLayoutEffect} from 'react';
import {gsap} from 'gsap';

const EMAIL = 'yavarenikya@gmail.com';
const URLS = {
    linkedin: 'https://www.linkedin.com/in/kotleni/',
    telegram: 'https://t.me/kotleni',
    github: 'https://github.com/kotleni',
};

interface JourneyCardProps {
    title: string;
    companyTitle: string | undefined;
    companyUrl: string | undefined;
    workingDates: string;
    description: string;
}

function JourneyCard(props: JourneyCardProps) {
    return (
        <div className="group flex flex-row gap-[16px] w-full py-2">
            <div
                className={cn(
                    'min-h-full min-w-[2px] bg-neutral-200 group-hover:bg-primary',
                    'transition-colors ease-in-out delay-0 duration-700 rounded-md',
                )}
            ></div>
            <div className="w-full">
                <div className="flex justify-between min-w-full text-sm">
                    <div className="text-xs">
                        <p className="text-[16px]">{props.title}</p>
                        <div
                            className="flex flex-row gap-1"
                            hidden={props.companyTitle === undefined}
                        >
                            <p>at,</p>
                            <a
                                hidden={props.companyUrl === undefined}
                                href={props.companyUrl}
                                className="underline"
                            >
                                {props.companyTitle}
                            </a>
                            <p
                                hidden={props.companyUrl !== undefined}
                                className="underline"
                            >
                                {props.companyTitle}
                            </p>
                        </div>
                    </div>
                    <div className="text-md">{props.workingDates}</div>
                </div>
                <p className="mt-2 text-sm">{props.description}</p>
            </div>
        </div>
    );
}

export default function Home() {
    const mainRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (mainRef.current) {
                gsap.from(mainRef.current.children, {
                    y: 30,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            }
        }, mainRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={mainRef} className="flex flex-col gap-4 pt-4">
            <section className="flex flex-row gap-4">
                <Image
                    src={Avatar}
                    alt="kotleni profile picture"
                    className="size-20 rounded-full"
                />
                <div className="flex flex-col justify-center gap-1">
                    <h2 className="text-xl">Hey👋, I'm Viktor</h2>
                    <p>Full-stack Software Engineer | Ukraine</p>
                    <div className="flex flex-row gap-3">
                        <SocialIcon Icon={GmailLogo} url={'mailto:' + EMAIL} />
                        <SocialIcon Icon={LinkedinLogo} url={URLS.linkedin} />
                        <SocialIcon Icon={TelegramLogo} url={URLS.telegram} />
                        <SocialIcon Icon={GithubLogo} url={URLS.github} />
                    </div>
                </div>
            </section>
            <section className="mt-4">
                <p className="font-semibold">about me.</p>
                <p className="mt-2">
                    i'm a enthusiastic full-stack developer who constantly
                    learns and transforms complex problems into simple,
                    beautiful, and intuitive solutions through development and
                    design.
                </p>
            </section>
            <section className="mt-4">
                <p className="font-semibold">journey.</p>
                <div className="mt-2">
                    <JourneyCard
                        title="Android&iOS Developer"
                        companyTitle="bunch"
                        companyUrl={undefined}
                        workingDates="jan 2019 - dec 2024"
                        description="For more than four years, I was deeply immersed in native mobile development. This foundational chapter of my career was spent building, launching, and maintaining robust applications for both Android (Kotlin) and iOS (Swift)."
                    />
                    <JourneyCard
                        title="Full-stack Developer"
                        companyTitle="Freelance"
                        companyUrl={undefined}
                        workingDates="nov 2024 - now"
                        description="As a freelance developer, I take full ownership of building modern web applications. I use a powerful stack including React, Node.js, and TypeScript to deliver production-ready code for my clients."
                    />
                </div>
            </section>
            <section className="mt-4">
                <p className="font-semibold">skills.</p>

                <div className="mt-2 flex flex-row flex-wrap gap-2">
                    {[
                        'javascript',
                        'typescript',
                        'html',
                        'css',
                        'reactjs',
                        'nextjs',
                        'expressjs',
                        'tailwindcss',
                        'sass',
                        'prisma',
                        'sql',
                        'firebase',
                        'mongodb',
                        'git',
                        'linux',
                        'docker',
                        'kubernetes',
                        'vercel',
                    ].map(skill => (
                        <Badge key={skill} variant="secondary">
                            {skill}
                        </Badge>
                    ))}
                </div>

                <p className="mt-2 mb-1 text-sm">Additional stack:</p>
                <div className="flex flex-row flex-wrap gap-2">
                    {[
                        'kotlin',
                        'java',
                        'c',
                        'c++',
                        'c#',
                        'php',
                        'python',
                        'android',
                        'ios',
                        'unity',
                        'sdl',
                        'opengl',
                        'gsls',
                    ].map(skill => (
                        <Badge key={skill} variant="secondary">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </section>
            <section className="mt-4">
                <p className="font-semibold">contact.</p>
                <p>
                    interested in a conversation? drop dm's over{' '}
                    <Link className="underline" href={URLS.linkedin}>
                        Linkedin
                    </Link>
                    ,{' '}
                    <Link className="underline" href={URLS.telegram}>
                        Telegram
                    </Link>{' '}
                    or{' '}
                    <Link className="underline" href={'mailto:' + EMAIL}>
                        {EMAIL}
                    </Link>
                    . ask me anything about my work, projects, or anything else.
                </p>
                <br/>
            </section>
        </div>
    );
}
