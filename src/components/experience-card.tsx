import {Chip} from './chip';

export interface ExperienceCardProps {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    tags: string[];
}

export function ExperienceCard(props: ExperienceCardProps) {
    return (
        <div className="flex flex-col md:flex-row md:gap-2 md:px-4 md:py-2 md:rounded-md md:transition-all md:hover:bg-primary/10 md:group-hover/list:opacity-50 ">
            <span className="md:w-32 flex-shrink-0">
                <p className="text-xs font-bold uppercase mt-1">
                    {props.startDate} - {props.endDate}
                </p>
            </span>
            <span className="overflow-hidden">
                <h3 className="text-base font-bold">{props.title}</h3>
                <p className="text-sm mt-3">{props.description}</p>
                <p className="text-sm my-3">
                    {props.tags.map(tag => (
                        <Chip key={tag} tag={tag} />
                    ))}
                </p>
            </span>
        </div>
    );
}
