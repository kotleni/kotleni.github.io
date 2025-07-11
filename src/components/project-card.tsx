import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';

export interface ProjectCardProps {
    title: string;
    description: string;
    githubUrl: string;
    tags: string[];
}

export function ProjectCard(props: ProjectCardProps) {
    return (
        <div className="md:px-4 md:py-2 md:rounded-md md:transition-all md:hover:bg-slate-800/50 md:group-hover/list:opacity-50">
            <Link
                href={props.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center gap-1 hover:text-primary"
            >
                <h3 className="text-base font-bold ">{props.title}</h3>
                <ArrowUpRight className="size-4" />
            </Link>
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
