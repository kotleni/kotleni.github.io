import type {ReactNode} from 'react';
import {useEffect} from 'react';
import {DecimalAge} from '@/components/decimal-age';
import {JourneyCard} from '@/components/journey-card';
import {Panel} from '@/components/panel';
import {getKyivTimeZoneInfo} from '@/lib/utils';

type DetailResolver = () => ReactNode;

interface Detail {
    title: string;
    resolver: DetailResolver;
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
    languages: Language[];
}

class BioBuilder {
    private data: Bio = {
        fullName: '',
        description: '',
        details: [],
        additional: [],
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
        `I like simple, efficient, open-source software, reverse engineering, and networking. Previously worked on native Android and iOS apps.`,
    )
    // .detail('Position', () => 'Open Source Contributor')
    .detail('Location', () => 'Kremenchuk, Ukraine')
    .detail('Timezone', () => getKyivTimeZoneInfo().utcOffset ?? '?')
    .detail('Age', () => <DecimalAge birthDate="2002-09-02" />)
    .detail('Devices', () => 'PC with AMD Ryzen 7 5700X, MacBook Air M1')
    .detail('OS', () => 'Arch Linux on PC, Fedora Laptop and Servers')
    .language('English', 'Upper-Intermediate (B2)')
    .language('Ukrainian', 'Native')
    .language('Russian', 'Native')
    .build();

export function RootPage() {
    useEffect(() => {
        document.title = 'kotleni — about';
    }, []);

    return (
        <div>
            <header>
                <div className="docs-kicker">
                    <span className="docs-accent">software engineer</span>{' '}
                    <span>@kotleni</span>
                </div>
                <h1 className="docs-page-title">{bio.fullName}</h1>
                <p className="docs-lead">{bio.description}</p>
            </header>

            <Panel title="verbose">
                <dl className="docs-fields">
                    {bio.details.map(detail => (
                        <div key={detail.title} className="docs-field-row">
                            <dt className="docs-field-term">{detail.title}</dt>
                            <dd className="docs-field-desc">
                                {detail.resolver()}
                            </dd>
                        </div>
                    ))}
                </dl>
            </Panel>

            <Panel title="languages">
                <div>
                    {bio.languages.map(language => (
                        <span key={language.name} className="docs-chip">
                            <b>{language.name}</b>
                            <span className="docs-dim">
                                {' :: '}
                                {language.levelName}
                            </span>
                        </span>
                    ))}
                </div>
            </Panel>

            <Panel title="journey">
                <div className="docs-list">
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
        </div>
    );
}
