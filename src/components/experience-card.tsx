export interface ExperienceCardProps {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    tags: string[];
}

export function ExperienceCard(props: ExperienceCardProps) {
    return (
        <div className="flex flex-col md:flex-row md:gap-2 mb-6">
            <span className="md:w-32 flex-shrink-0">
                <p className="text-xs font-bold uppercase mt-1">
                    {props.startDate} - {props.endDate}
                </p>
            </span>
            <span>
                <h3 className="text-base font-bold text-slate-200">
                    {props.title}
                </h3>
                <p className="text-sm mt-3">{props.description}</p>
                <p className="text-sm my-3">
                    {props.tags.map(tag => (
                        <span
                            className="text-xs font-medium mr-2 px-3 py-1 bg-teal-400/10 text-teal-300 rounded-full"
                            key={tag}
                        >
                            {tag}
                        </span>
                    ))}
                </p>
            </span>
        </div>
    );
}
