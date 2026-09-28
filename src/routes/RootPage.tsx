import type {ReactNode} from 'react';
import {DecimalAge} from '@/components/decimal-age';
import {JourneyCard} from '@/components/journey-card';
import {Panel} from '@/components/panel';
import {getKyivTimeZoneInfo} from '@/lib/utils';

type DetailResolver = () => ReactNode;

interface Detail {
    title: string;
    resolver: DetailResolver;
}

interface Social {
    name: string;
    url: string;
}

interface Language {
    name: string;
    levelName: string;
}

interface Bio {
    fullName: string;
    description: string;
    details: Detail[];
    additional: string[];
    socials: Social[];
    email: string;
    languages: Language[];
}

class BioBuilder {
    private data: Bio = {
        fullName: '',
        description: '',
        details: [],
        additional: [],
        socials: [],
        email: '',
        languages: [],
    };

    base(fullName: string, description: string): this {
        this.data.fullName = fullName;
        this.data.description = description;
        return this;
    }

    detail(title: string, resolver: DetailResolver): this {
        this.data.details.push({title, resolver});
        return this;
    }

    contact(name: string, url: string): this {
        this.data.socials.push({name, url});
        return this;
    }

    mail(email: string): this {
        this.data.email = email;
        return this;
    }

    language(name: string, levelName: string): this {
        this.data.languages.push({name, levelName});
        return this;
    }

    build(): Bio {
        return this.data;
    }
}

const bio = new BioBuilder()
    .base(
        'Viktor Varenik',
        `I'm a software engineer focused on software efficiency, simplicity and freedom. I also enjoy recreational programming, reverse engineering and networking. Previously, I developed native mobile applications for Android and iOS.`,
    )
    .detail(
        'Position',
        () => 'Full Stack Software Engineer | Infrastructure & DevOps',
    )
    .detail('Location', () => 'Kremenchuk, Ukraine')
    .detail('Timezone', () => getKyivTimeZoneInfo().utcOffset ?? '?')
    .detail('Age', () => <DecimalAge birthDate="2002-09-02" />)
    // .detail('Education', () => "Bachelor's Diploma \n(Machinery engineering)")
    .detail('Devices', () => 'PC with AMD Ryzen 7 5700X, MacBook Air M1')
    .detail(
        'Smartphones',
        () => 'iPhone 12, OnePlus Nord N10, Xiaomi S2 and Xiaomi Redmi Note 9',
    )
    .detail('OS', () => 'Arch Linux on PC and Laptop')
    .language('English', 'Upper-Intermediate (B2)')
    .language('Ukrainian', 'Native')
    .language('Russian', 'Native')
    .mail('yavarenikya@gmail.com')
    .contact('Github', 'https://github.com/kotleni')
    .contact('Linkedin', 'https://www.linkedin.com/in/kotleni/')
    .contact('Telegram', 'https://t.me/kotleni')
    .contact('X', 'https://x.com/kotleni_')
    .build();

const links = [
    ...bio.socials.map(social => ({
        name: social.name.toLowerCase(),
        url: social.url,
        display: social.url.replace(/^https?:\/\//, '').replace(/\/$/, ''),
    })),
    {
        name: 'email',
        url: `mailto:${bio.email}`,
        display: bio.email,
    },
];

export function RootPage() {
    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-2 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                    <span className="text-accent">software engineer</span>
                    <span aria-hidden="true">///</span>
                    <span>@kotleni</span>
                </div>
                <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                    {bio.fullName}
                </h1>
                <p className="max-w-prose text-muted-foreground">
                    {bio.description}
                </p>
            </header>

            <Panel title="verbose.txt">
                <dl className="flex flex-col gap-2">
                    {bio.details.map(detail => (
                        <div
                            key={detail.title}
                            className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2"
                        >
                            <dt className="shrink-0 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground sm:w-32">
                                {detail.title}
                            </dt>
                            <dd className="flex min-w-0 flex-1 items-baseline gap-2">
                                <span className="whitespace-pre-wrap">
                                    {detail.resolver()}
                                </span>
                                <span className="leader" aria-hidden="true" />
                            </dd>
                        </div>
                    ))}
                </dl>
            </Panel>

            <Panel title="languages.txt">
                <div className="flex flex-wrap gap-2">
                    {bio.languages.map(language => (
                        <span
                            key={language.name}
                            className="win px-2 py-1 text-sm"
                        >
                            <span className="font-bold text-foreground">
                                {language.name}
                            </span>
                            <span className="text-muted-foreground">
                                {' :: '}
                                {language.levelName}
                            </span>
                        </span>
                    ))}
                </div>
            </Panel>

            <Panel title="journey.log">
                <div className="flex flex-col divide-y divide-dashed divide-border">
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
                    <JourneyCard
                        title="React Developer"
                        companyTitle="Intetics Team"
                        companyUrl="https://intetics.com/"
                        workingDates="nov 2024 - now"
                        description="Developing responsive web applications for various clients using React and Next.js. Focused mostly on front-end (mobile-first), integration with APIs, state management, and performance optimization."
                    />
                </div>
            </Panel>

            <Panel title="links.html">
                <p className="text-muted-foreground">
                    interested in a conversation? ask me anything about my work
                    and projects.
                </p>
                <dl className="mt-3 flex flex-col gap-1.5">
                    {links.map(link => (
                        <div
                            key={link.name}
                            className="flex items-baseline gap-2"
                        >
                            <dt className="shrink-0 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                                {link.name}
                            </dt>
                            <span className="leader" aria-hidden="true" />
                            <dd className="min-w-0 truncate">
                                <a
                                    href={link.url}
                                    className="text-accent underline decoration-dotted underline-offset-2 hover:decoration-solid"
                                >
                                    {link.display}
                                </a>
                            </dd>
                        </div>
                    ))}
                </dl>
            </Panel>
        </div>
    );
}
