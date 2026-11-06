interface JourneyCardProps {
    title: string;
    companyTitle: string | undefined;
    companyUrl: string | undefined;
    workingDates: string;
    description: string;
}

export function JourneyCard(props: JourneyCardProps) {
    return (
        <article className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:gap-4">
            <div className="shrink-0 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground sm:w-44 sm:pt-1">
                {props.workingDates}
            </div>
            <div className="flex min-w-0 flex-col gap-1.5">
                <h3 className="font-bold text-foreground">{props.title}</h3>
                <div
                    className="text-sm text-muted-foreground"
                    hidden={props.companyTitle === undefined}
                >
                    <span>at</span>{' '}
                    <a
                        hidden={props.companyUrl === undefined}
                        href={props.companyUrl}
                        className="text-accent underline decoration-dotted underline-offset-2"
                    >
                        {props.companyTitle}
                    </a>
                    <span hidden={props.companyUrl !== undefined}>
                        {props.companyTitle}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">
                    {props.description}
                </p>
            </div>
        </article>
    );
}
