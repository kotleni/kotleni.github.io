export interface ExperienceCardProps {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    tags: string[];
}

export function ExperienceCard(props: ExperienceCardProps) {
    return (
        <div className="mb-6 px-8">
            <p className="text-sm font-bold">
                {props.startDate} - {props.endDate}
            </p>
            <h3 className="text-lg font-bold text-slate-200">{props.title}</h3>
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
        </div>
    );
}
