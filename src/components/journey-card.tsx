interface JourneyCardProps {
    title: string;
    companyTitle: string | undefined;
    companyUrl: string | undefined;
    workingDates: string;
    description: string;
}

export function JourneyCard(props: JourneyCardProps) {
    return (
        <article>
            <b>{props.title}</b>
            <div className="docs-journey-date">
                {props.workingDates}
                {props.companyTitle && (
                    <>
                        {' '}
                        at{' '}
                        {props.companyUrl ? (
                            <a href={props.companyUrl}>{props.companyTitle}</a>
                        ) : (
                            props.companyTitle
                        )}
                    </>
                )}
            </div>
            <p>{props.description}</p>
        </article>
    );
}
