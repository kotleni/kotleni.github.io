'use client';

import Link from 'next/link';
import {AboutPart} from './about-part';
import {ExperiencePart} from '@/app/experience-part';
import {ProjectsPart} from '@/app/projects-part';
import {useExtensions} from '@/hooks/use-extensions';
import {Extension} from '@/extentions';
import {GithubLogo} from '@/icons/github-logo';
import {GmailLogo} from '@/icons/gmail-logo';
import {TelegramLogo} from '@/icons/telegram-logo';
import {LinkedinLogo} from '@/icons/linkedin-logo';
import {StyledLink} from '@/components/styled-link';

function LeftSide() {
    const extensions = useExtensions();

    return (
        <div className="w-full md:w-[40%] md:flex-shrink-0">
            <div className="w-full md:w-fit flex flex-col grow-0 p-(--blocks-padding-mobile) md:p-(--blocks-padding) pt-4 md:pt-34 md:fixed md:top-0 md:max-h-screen">
                <Link href="/" className="text-4xl md:text-5xl font-bold">
                    Viktor Varenik
                </Link>
                <h2 className="text-lg md:text-2xl font-medium mt-2">
                    Full-stack Web Developer
                </h2>
                <p className="mt-3 leading-normal max-w-md">
                    I build websites with NextJS, React, NestJS and Tailwind CSS
                    using TypeScript and WebStorm.
                    {extensions.isEnabled(Extension.Cute) ? ' :3' : ''}
                </p>

                <div className="flex flex-row gap-2 py-4">
                    <Link href="mailto:yavarenikya@gmail.com">
                        <GmailLogo className="size-6 hover:text-primary/80" />
                    </Link>
                    <Link href="https://github.com/kotleni">
                        <GithubLogo className="size-6 hover:text-primary/80" />
                    </Link>
                    <Link href="https://t.me/kotleni">
                        <TelegramLogo className="size-6 hover:text-primary/80" />
                    </Link>
                    <Link href="https://linkedin.com/in/kotleni/">
                        <LinkedinLogo className="size-6 hover:text-primary/80" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

function RightSide() {
    const extensions = useExtensions();

    return (
        <div className="w-full md:h-full pt-16 md:pt-24 p-(--blocks-padding-mobile) md:p-(--blocks-padding) overflow-x-hidden">
            <AboutPart />
            <ExperiencePart />
            <ProjectsPart />

            <p className="mt-16 md:px-4 pb-4 text-sm">
                Designed in{' '}
                <StyledLink href="https://www.figma.com/">Figma</StyledLink> and
                coded in{' '}
                <StyledLink href="https://code.visualstudio.com/">
                    VSCode
                </StyledLink>
                . Built with{' '}
                <StyledLink href="https://nextjs.org/">Next.js</StyledLink>, and
                <StyledLink href="https://tailwindcss.com/">
                    Tailwind CSS
                </StyledLink>
                , deployed with{' '}
                <StyledLink href="https://github.com/resources/articles/devops/ci-cd">
                    Github CI
                </StyledLink>
                . Heavily inspired by{' '}
                <StyledLink href="https://brittanychiang.com/">
                    Brittany Chiang website
                </StyledLink>
                . {extensions.isEnabled(Extension.Cute) ? ':3' : ''}
            </p>
        </div>
    );
}

export default function Home() {
    return (
        <div className="w-full flex justify-center overflow-x-hidden">
            <div className="w-full md:container xl:max-w-7xl md:flex md:flex-row md:items-start max-md:pt-8">
                <LeftSide />
                <RightSide />
            </div>
        </div>
    );
}
