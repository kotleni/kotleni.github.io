'use client';

import {DecimalAge} from '@/components/decimal-age';
import {getKyivTimeZoneInfo} from '@/lib/utils';
import {aboutMe, myEmail, myUrls} from '@/data/about';
import {SocialIcon} from '@/components/social-icon';
import {GmailLogo} from '@/icons/gmail-logo';
import {LinkedinLogo} from '@/icons/linkedin-logo';
import {TelegramLogo} from '@/icons/telegram-logo';
import {GithubLogo} from '@/icons/github-logo';
import {Badge} from '@/components/ui/badge';
import Link from 'next/link';
import {JourneyCard} from '@/components/journey-card';
import {StyledLink} from '@/components/styled-link';

export default function BioPage() {
    const timeInfo = getKyivTimeZoneInfo();

    return (
        <div className="flex flex-col gap-6 mt-2 text-foreground/90">
            <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Viktor Varenik
                    </h1>
                    <div className="flex gap-3">
                        <SocialIcon
                            Icon={GmailLogo}
                            url={'mailto:' + myEmail}
                        />
                        <SocialIcon Icon={LinkedinLogo} url={myUrls.linkedin} />
                        <SocialIcon Icon={TelegramLogo} url={myUrls.telegram} />
                        <SocialIcon Icon={GithubLogo} url={myUrls.github} />
                    </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    {aboutMe}
                </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="flex flex-col">
                    <p className="font-semibold">verbose.</p>
                    <div className="flex flex-col gap-2 text-sm mt-2">
                        <div className="flex justify-between items-center border-b border-border/50 pb-1">
                            <span className="font-bold">Position</span>
                            <span className="text-muted-foreground text-right">
                                Full-stack Engineer
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/50 pb-1">
                            <span className="font-bold">Location</span>
                            <a
                                href="https://www.google.com/maps/place/Kharkiv"
                                target="_blank"
                                className="text-muted-foreground hover:underline underline-offset-4 decoration-dotted text-right"
                            >
                                Ukraine, Kharkiv
                            </a>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/50 pb-1">
                            <span className="font-bold">Timezone</span>
                            <span
                                className="text-muted-foreground text-right"
                                title={timeInfo.season}
                            >
                                {timeInfo.utcOffset}
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/50 pb-1">
                            <span className="font-bold">Age</span>
                            <span className="text-muted-foreground text-right">
                                <DecimalAge birthDate="2002-09-02T03:24:00" />{' '}
                                years
                            </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/50 pb-1">
                            <span className="font-bold">Education</span>
                            <span className="text-muted-foreground text-right">
                                Non-technical
                            </span>
                        </div>
                    </div>
                </section>

                <section className="flex flex-col">
                    <p className="font-semibold">languages.</p>
                    <div className="flex flex-col gap-2 text-sm mt-2">
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="font-bold">Ukrainian</span>
                            <span className="text-muted-foreground">
                                Native
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="font-bold">Russian</span>
                            <span className="text-muted-foreground">
                                Native
                            </span>
                        </div>
                        <div className="flex justify-between border-b border-border/50 pb-1">
                            <span className="font-bold">English</span>
                            <span className="text-muted-foreground">
                                Upper-Intermediate (B2)
                            </span>
                        </div>
                    </div>
                </section>
            </div>

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
                        'swift',
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
                <p className="font-semibold">journey.</p>
                <div className="mt-2">
                    <JourneyCard
                        title="Android&iOS Developer"
                        companyTitle="AppLead Pro & VIPAPP & Gravity"
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

            <section className="flex flex-col" hidden={true}>
                <p className="font-semibold">devices.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-2">
                    <div className="p-3 border rounded-lg bg-card/30">
                        <h3 className="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                            Workstations
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>PC: AMD Ryzen 7 5700X</li>
                            <li>MacBook Air M1 8/256</li>
                        </ul>
                    </div>
                    <div className="p-3 border rounded-lg bg-card/30">
                        <h3 className="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                            Home Lab
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>HP Elitedesk G4 DM</li>
                        </ul>
                    </div>
                    <div className="p-3 border rounded-lg bg-card/30">
                        <h3 className="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                            Mobile
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li>iPhone 12 256Gb (Main)</li>
                            <li className="text-muted-foreground">
                                OnePlus Nord N10
                            </li>
                            <li className="text-muted-foreground">
                                Xiaomi Redmi Note 9
                            </li>
                            <li className="text-muted-foreground">
                                Xiaomi Redmi S2
                            </li>
                        </ul>
                    </div>
                    <div className="p-3 border rounded-lg bg-card/30">
                        <h3 className="font-semibold text-muted-foreground mb-2 text-xs uppercase tracking-wider">
                            Entertainment
                        </h3>
                        <ul className="list-disc list-inside space-y-1">
                            <li className="flex items-center gap-2">
                                Nintendo Switch rev 2
                            </li>
                            <li className="flex items-center gap-2">
                                Oculus Quest 2
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="mt-4">
                <p className="font-semibold">contact.</p>
                <p>
                    interested in a conversation? drop dm's over{' '}
                    <StyledLink href={myUrls.linkedin}>Linkedin</StyledLink>,{' '}
                    <StyledLink href={myUrls.telegram}>Telegram</StyledLink> or{' '}
                    <StyledLink href={'mailto:' + myEmail}>
                        {myEmail}
                    </StyledLink>
                    . ask me anything about my work, projects, or anything else.
                </p>
            </section>
        </div>
    );
}
