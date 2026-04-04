interface JourneyItemProps {
    title: string;
    companyTitle: string;
    companyUrl: string | null;
    workingDates: string;
    description: string;
}

export default function JourneyItem({
    title,
    companyTitle,
    companyUrl,
    workingDates,
    description,
}: JourneyItemProps) {
    return (
        <div className="job">
            <div className="timeline" />

            <div className="content">
                <div className="header">
                    <div className="title">
                        <p className="job-title">{title}</p>

                        {companyTitle ? (
                            <div className="company">
                                <p className="company-prefix">at</p>
                                {companyUrl ? (
                                    <a
                                        href={companyUrl}
                                        className="company-link"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {companyTitle}
                                    </a>
                                ) : (
                                    <p className="company-text">
                                        {companyTitle}
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <time className="dates">{workingDates}</time>
                </div>

                <p className="description">{description}</p>
            </div>
        </div>
    );
}
