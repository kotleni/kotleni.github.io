interface JourneyCardProps {
    title: string;
    companyTitle: string | undefined;
    companyUrl: string | undefined;
    workingDates: string;
    description: string;
}

export function JourneyCard(props: JourneyCardProps) {
    return (
        <div className="group rounded-xl bg-card p-5 shadow-sm ring-1 ring-border transition-shadow hover:shadow-md sm:p-6">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between gap-4 max-sm:flex-col">
                    <div>
                        <p className="font-bold text-foreground">
                            {props.title}
                        </p>
                        <div
                            className="flex flex-wrap gap-1.5 text-[0.85rem] text-muted-foreground"
                            hidden={props.companyTitle === undefined}
                        >
                            <p>at</p>
                            <a
                                hidden={props.companyUrl === undefined}
                                href={props.companyUrl}
                                className="text-primary no-underline transition-colors hover:underline"
                            >
                                {props.companyTitle}
                            </a>
                            <p
                                hidden={props.companyUrl !== undefined}
                                className="text-primary"
                            >
                                {props.companyTitle}
                            </p>
                        </div>
                    </div>
                    <div className="whitespace-nowrap text-[0.8rem] text-muted-foreground">
                        {props.workingDates}
                    </div>
                </div>
                <p className="text-[0.9rem] leading-7 text-muted-foreground">
                    {props.description}
                </p>
            </div>
        </div>
    );
}
