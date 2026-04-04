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
        <div className="grid gap-4 md:grid-cols-[16px_minmax(0,1fr)]">
            <div className="relative mx-auto min-h-full w-[2px] bg-brand before:absolute before:left-1/2 before:top-0.0 before:h-3 before:w-3 before:-translate-x-1/2 before:rounded-full before:bg-highlight before:shadow-[0_0_0_4px_color-mix(in_srgb,var(--app-highlight)_20%,transparent_80%)]" />

            <div className="w-full">
                <div className="flex flex-col gap-[18px] md:flex-row md:items-start md:justify-between">
                    <div className="text-[0.95rem]">
                        <p className="m-0 text-[1.08rem] leading-[1.25]">{title}</p>

                        {companyTitle ? (
                            <div className="flex flex-wrap items-center gap-1.5 text-muted-ink">
                                <p className="m-0">at</p>
                                {companyUrl ? (
                                    <a
                                        href={companyUrl}
                                        className="border-b border-brand/30 text-ink no-underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {companyTitle}
                                    </a>
                                ) : (
                                    <p className="m-0 border-b border-brand/30 text-ink">
                                        {companyTitle}
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <time className="shrink-0 bg-brand/10 px-2 py-1 font-mono text-[0.74rem] uppercase tracking-[0.08em] text-muted-ink">
                        {workingDates}
                    </time>
                </div>

                <p className="mt-3 mb-0 text-muted-ink">{description}</p>
            </div>
        </div>
    );
}
