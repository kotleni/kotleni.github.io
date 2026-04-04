import JourneyItem from '@/components/JourneyItem';
import {
    aboutMe,
    birthDate,
    journeyItems,
    myEmail,
    skillsStack,
    skillsStackAdditional,
    socials,
} from '@/data/about';
import {badges} from '@/data/badges';

const heroFacts = [
    {label: 'Role', value: 'Full-stack engineer'},
    {label: 'Base', value: 'Ukraine, Kremenchuk'},
    {label: 'Timezone', value: 'GMT+2'},
    {label: 'Reach out', value: myEmail},
];

const profileFacts = [
    {label: 'Position', value: 'Full-stack engineer'},
    {label: 'Location', value: 'Ukraine, Kremenchuk'},
    {label: 'Timezone', value: 'GMT+2'},
    {label: 'Age', value: `up ${getAgeString()}`},
];

const languageFacts = [
    {label: 'Ukrainian', value: 'Native'},
    {label: 'Russian', value: 'Native'},
    {label: 'English', value: 'Upper-Intermediate (B2)'},
];

function getAgeString() {
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return `${years} years, ${months} months`;
}

export default function RootPage() {
    return (
        <div className="flex flex-col gap-[22px]">
            <section className="relative grid gap-[26px] border border-line bg-panel px-[18px] py-[34px] shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.85fr)]">
                <div className="relative z-10">
                    <p className="mb-4 font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                        About
                    </p>
                    <div className="grid gap-2 pb-4">
                        <h1 className="m-0 max-w-[10ch] text-[clamp(3rem,8vw,5.4rem)] leading-[0.92] font-bold tracking-[-0.07em] text-balance max-[560px]:max-w-none">
                            Viktor Varenik
                        </h1>
                        <h1 className="m-0 text-[clamp(1rem,2vw,1.35rem)] font-semibold tracking-[0.02em] text-accent">
                            (kotleni)
                        </h1>
                    </div>
                    <p className="m-0 max-w-[70ch] text-[1rem] text-muted-ink">
                        {aboutMe}
                    </p>
                </div>
                <div className="relative z-10 flex items-end">
                    <div className="grid w-full gap-3.5 sm:grid-cols-2">
                        {heroFacts.map(fact => (
                            <div
                                key={fact.label}
                                className="border border-line bg-panel-strong px-3.5 pt-3.5 pb-3"
                            >
                                <span className="mb-1.5 block font-mono text-[0.72rem] uppercase tracking-[0.08em] text-muted-ink">
                                    {fact.label}
                                </span>
                                <span className="block min-w-0 break-words text-[0.98rem] font-semibold">
                                    {fact.label === 'Reach out' ? (
                                        <a
                                            href={`mailto:${myEmail}`}
                                            className="break-all"
                                        >
                                            {fact.value}
                                        </a>
                                    ) : (
                                        fact.value
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative grid gap-7 border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px] lg:grid-cols-[190px_minmax(0,1fr)]">
                <div className="flex flex-col gap-2.5 border-b border-line pb-3.5 lg:border-r lg:border-b-0 lg:pr-[18px] lg:pb-0">
                    <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                        Connect
                    </p>
                    <h2 className="m-0 text-[1.42rem] leading-none tracking-[-0.04em]">
                        socials.
                    </h2>
                </div>
                <div className="min-w-0">
                    <div className="flex flex-col gap-[18px]">
                        <p className="m-0 max-w-[70ch] text-[1rem] text-muted-ink">
                            Interested in a conversation? Drop DMs over socials
                            below, or mail me at{' '}
                            <a href={`mailto:${myEmail}`}>{myEmail}</a>. Ask me
                            anything about my work, projects, or anything else.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {socials.map(social => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        className="inline-flex items-center gap-2.5 border border-line bg-panel-strong px-3 py-2.5 text-ink no-underline transition hover:-translate-y-px hover:border-line-strong max-[560px]:w-full"
                                        aria-label={social.name}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {Icon ? (
                                            <Icon
                                                className="h-5 w-5 shrink-0 fill-current"
                                                aria-hidden="true"
                                            />
                                        ) : null}
                                        <span className="text-[0.94rem] font-semibold">
                                            {social.name}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative grid gap-7 border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px] lg:grid-cols-[190px_minmax(0,1fr)]">
                <div className="flex flex-col gap-2.5 border-b border-line pb-3.5 lg:border-r lg:border-b-0 lg:pr-[18px] lg:pb-0">
                    <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                        Profile
                    </p>
                    <h2 className="m-0 text-[1.42rem] leading-none tracking-[-0.04em]">
                        details.
                    </h2>
                </div>
                <div className="min-w-0">
                    <div className="grid gap-[22px] lg:grid-cols-2">
                        <div className="flex flex-col gap-0.5">
                            <h3>verbose.</h3>
                            {profileFacts.map(fact => (
                                <div
                                    key={fact.label}
                                    className="flex items-center justify-between gap-[18px] border-b border-line py-3 last:border-b-0"
                                >
                                    <p className="m-0 font-mono text-[0.76rem] uppercase tracking-[0.08em] text-muted-ink">
                                        {fact.label}
                                    </p>
                                    <span>{fact.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-0.5">
                            <h3>languages.</h3>
                            {languageFacts.map(fact => (
                                <div
                                    key={fact.label}
                                    className="flex items-center justify-between gap-[18px] border-b border-line py-3 last:border-b-0"
                                >
                                    <p className="m-0 font-mono text-[0.76rem] uppercase tracking-[0.08em] text-muted-ink">
                                        {fact.label}
                                    </p>
                                    <span>{fact.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative grid gap-7 border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px] lg:grid-cols-[190px_minmax(0,1fr)]">
                <div className="flex flex-col gap-2.5 border-b border-line pb-3.5 lg:border-r lg:border-b-0 lg:pr-[18px] lg:pb-0">
                    <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                        Stack
                    </p>
                    <h2 className="m-0 text-[1.42rem] leading-none tracking-[-0.04em]">
                        skills.
                    </h2>
                </div>
                <div className="min-w-0">
                    <div className="flex flex-wrap gap-2.5">
                        {skillsStack.map(skill => (
                            <span
                                key={skill}
                                className="border border-line bg-panel-strong px-2.5 py-2 font-mono text-[0.86rem] transition hover:-translate-y-px hover:border-line-strong"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                    <div className="pt-6">
                        <h4 className="mb-2.5 font-mono text-[0.78rem] uppercase tracking-[0.1em] text-muted-ink">
                            Additional stack:
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                            {skillsStackAdditional.map(skill => (
                                <span
                                    key={skill}
                                    className="border border-line bg-panel-strong px-2.5 py-2 font-mono text-[0.86rem] transition hover:-translate-y-px hover:border-line-strong"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative grid gap-7 border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px] lg:grid-cols-[190px_minmax(0,1fr)]">
                <div className="flex flex-col gap-2.5 border-b border-line pb-3.5 lg:border-r lg:border-b-0 lg:pr-[18px] lg:pb-0">
                    <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                        Work
                    </p>
                    <h2 className="m-0 text-[1.42rem] leading-none tracking-[-0.04em]">
                        journey.
                    </h2>
                </div>
                <div className="min-w-0">
                    <div className="flex flex-col gap-3.5">
                        {journeyItems.map(journey => (
                            <div
                                key={`${journey.companyName}-${journey.date}`}
                                className="border border-line bg-panel-strong px-4 pt-4 pb-3.5 transition hover:translate-x-1 hover:border-line-strong max-[560px]:hover:translate-x-0"
                            >
                                <JourneyItem
                                    title={journey.title}
                                    companyTitle={journey.companyName}
                                    companyUrl={journey.companyUrl}
                                    workingDates={journey.date}
                                    description={journey.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative grid gap-7 border border-line bg-panel px-[18px] py-7 shadow-panel before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-brand md:px-[30px] lg:grid-cols-[190px_minmax(0,1fr)]">
                <div className="flex flex-col gap-2.5 border-b border-line pb-3.5 lg:border-r lg:border-b-0 lg:pr-[18px] lg:pb-0">
                    <p className="font-mono text-[0.76rem] uppercase tracking-[0.16em] text-accent">
                        Web
                    </p>
                    <h2 className="m-0 text-[1.42rem] leading-none tracking-[-0.04em]">
                        badges.
                    </h2>
                </div>
                <div className="min-w-0">
                    <div className="flex flex-wrap gap-3">
                        {badges.map(badge => (
                            <a
                                key={badge.label}
                                className="inline-flex border border-line bg-panel-strong p-2 transition hover:-translate-y-px hover:border-line-strong"
                                href={badge.targetUrl ?? undefined}
                                target={
                                    badge.targetUrl && badge.targetUrl !== '#'
                                        ? '_blank'
                                        : undefined
                                }
                                rel={
                                    badge.targetUrl && badge.targetUrl !== '#'
                                        ? 'noreferrer'
                                        : undefined
                                }
                            >
                                <img
                                    src={badge.imageUrl}
                                    aria-label={badge.label}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <div className="pt-2 text-center font-mono text-[0.8rem] uppercase tracking-[0.08em] text-muted-ink">
                <p>version {APP_VERSION}</p>
            </div>
        </div>
    );
}
