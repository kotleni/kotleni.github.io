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
        <div className="blocks">
            <section className="hero-panel">
                <div className="hero-copy">
                    <p className="section-kicker">About</p>
                    <div className="namediv">
                        <h1 className="realname">Viktor Varenik</h1>
                        <h1 className="nickname">(kotleni)</h1>
                    </div>
                    <p className="hero-summary">{aboutMe}</p>
                </div>
                <div className="hero-meta">
                    <div className="hero-grid">
                        {heroFacts.map(fact => (
                            <div key={fact.label} className="hero-point">
                                <span className="hero-point-label">
                                    {fact.label}
                                </span>
                                <span className="hero-point-value">
                                    {fact.label === 'Reach out' ? (
                                        <a href={`mailto:${myEmail}`}>
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

            <section className="container section-row">
                <div className="section-rail">
                    <p className="section-kicker">Connect</p>
                    <h2 className="section-title">socials.</h2>
                </div>
                <div className="section-content socials-container">
                    <p className="section-copy">
                        Interested in a conversation? Drop DMs over socials
                        below, or mail me at{' '}
                        <a href={`mailto:${myEmail}`}>{myEmail}</a>. Ask me
                        anything about my work, projects, or anything else.
                    </p>
                    <div className="socials-list">
                        {socials.map(social => {
                            const Icon = social.icon;

                            return (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="social-item"
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {Icon ? <Icon /> : null}
                                    <span className="social-label">
                                        {social.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="container section-row">
                <div className="section-rail">
                    <p className="section-kicker">Profile</p>
                    <h2 className="section-title">details.</h2>
                </div>
                <div className="section-content">
                    <div className="two-rows">
                        <div className="table-info-column">
                            <h3>verbose.</h3>
                            {profileFacts.map(fact => (
                                <div key={fact.label} className="table-line">
                                    <p className="field-title">{fact.label}</p>
                                    <span>{fact.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="table-info-column">
                            <h3>languages.</h3>
                            {languageFacts.map(fact => (
                                <div key={fact.label} className="table-line">
                                    <p className="field-title">{fact.label}</p>
                                    <span>{fact.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="container section-row">
                <div className="section-rail">
                    <p className="section-kicker">Stack</p>
                    <h2 className="section-title">skills.</h2>
                </div>
                <div className="section-content">
                    <div className="skills-list">
                        {skillsStack.map(skill => (
                            <span key={skill} className="skill-chip">
                                {skill}
                            </span>
                        ))}
                    </div>
                    <h4 className="subtitle">Additional stack:</h4>
                    <div className="skills-list">
                        {skillsStackAdditional.map(skill => (
                            <span key={skill} className="skill-chip">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="container section-row">
                <div className="section-rail">
                    <p className="section-kicker">Work</p>
                    <h2 className="section-title">journey.</h2>
                </div>
                <div className="section-content">
                    <div className="journey-list">
                        {journeyItems.map(journey => (
                            <div
                                key={`${journey.companyName}-${journey.date}`}
                                className="journey-item"
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

            <section className="container section-row">
                <div className="section-rail">
                    <p className="section-kicker">Web</p>
                    <h2 className="section-title">badges.</h2>
                </div>
                <div className="section-content">
                    <div className="badges-list">
                        {badges.map(badge => (
                            <a
                                key={badge.label}
                                className="badge-item"
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

            <div className="bottom-info">
                <p>version {APP_VERSION}</p>
            </div>
        </div>
    );
}
