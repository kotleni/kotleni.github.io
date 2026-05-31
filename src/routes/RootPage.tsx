import {JourneyCard} from '@/components/journey-card';
import {StyledLink} from '@/components/styled-link';
import {badges} from '@/data/badges';
import {getKyivTimeZoneInfo} from '@/lib/utils';

type DetailResolver = () => string;

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
    .detail('Age', () => '23')
    .detail('Education', () => "Bachelor's Diploma \n(Machinery engineering)")
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

export function RootPage() {
    return (
        <div className="flex w-full flex-col gap-12">
            <header className="flex flex-col gap-3.5">
                <p className="text-xs uppercase tracking-[0.12em] text-primary">
                    software engineer
                </p>
                <h1 className="max-w-[12ch] text-[clamp(2.35rem,9vw,4.5rem)] font-bold leading-[0.96] text-foreground">
                    {bio.fullName}
                </h1>
                <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                    {bio.description}
                </p>
            </header>

            <div className="grid gap-12">
                <section className="flex flex-col gap-4">
                    <h2 className="font-bold text-foreground">verbose.</h2>
                    <div className="border-y border-border">
                        {bio.details.map(detail => (
                            <div
                                key={detail.title}
                                className="grid grid-cols-[minmax(8rem,0.75fr)_1.25fr] gap-4 border-t border-border py-3.5 text-sm first:border-t-0 max-sm:grid-cols-1"
                            >
                                <span className="font-bold text-foreground">
                                    {detail.title}
                                </span>
                                <span className="whitespace-pre-wrap text-muted-foreground">
                                    {detail.resolver()}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col gap-4">
                    <h2 className="font-bold text-foreground">languages.</h2>
                    <div className="border-y border-border">
                        {bio.languages.map(language => (
                            <div
                                key={language.name}
                                className="grid grid-cols-[minmax(8rem,0.75fr)_1.25fr] gap-4 border-t border-border py-3.5 text-sm first:border-t-0 max-sm:grid-cols-1"
                            >
                                <span className="font-bold text-foreground">
                                    {language.name}
                                </span>
                                <span className="text-muted-foreground">
                                    {language.levelName}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <section className="flex flex-col gap-4">
                <h2 className="font-bold text-foreground">journey.</h2>
                <div className="flex flex-col gap-6">
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
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="font-bold text-foreground">contact.</h2>
                <div className="text-[0.95rem] leading-7 text-muted-foreground">
                    interested in a conversation? drop dm's over{' '}
                    <span className="inline-flex flex-wrap gap-x-2 gap-y-1 items-center">
                        {bio.socials.map((social, index) => (
                            <span
                                key={social.url}
                                className="inline-flex items-center"
                            >
                                <StyledLink href={social.url}>
                                    {social.name.toLowerCase()}
                                </StyledLink>
                                {index < bio.socials.length - 1 && (
                                    <span className="ml-2 font-normal text-muted-foreground/50">
                                        /
                                    </span>
                                )}
                            </span>
                        ))}
                    </span>
                    <br className="hidden sm:block" /> or email me at{' '}
                    <span className="font-medium">
                        <StyledLink href={'mailto:' + bio.email}>
                            {bio.email}
                        </StyledLink>
                    </span>
                    . ask me anything about my work, projects, or anything else.
                </div>
            </section>

            <footer className="flex flex-col items-center gap-4 border-t border-border pt-4 text-center text-[0.72rem] uppercase tracking-[0.12em] text-muted-foreground">
                <div className="flex flex-wrap justify-center gap-1">
                    {badges.map(badge => {
                        const image = (
                            <img
                                className="h-[31px] w-[88px] [image-rendering:pixelated]"
                                src={badge.imageUrl}
                                alt={badge.label}
                                width="88"
                                height="31"
                            />
                        );

                        if (!badge.targetUrl) {
                            return (
                                <span
                                    key={badge.imageUrl}
                                    className="inline-flex"
                                >
                                    {image}
                                </span>
                            );
                        }

                        return (
                            <a
                                key={badge.imageUrl}
                                href={badge.targetUrl}
                                aria-label={badge.label}
                                className="inline-flex"
                            >
                                {image}
                            </a>
                        );
                    })}
                </div>
                <p>version {PACKAGE_VERSION}</p>
            </footer>
        </div>
    );
}
