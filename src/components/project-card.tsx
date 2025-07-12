import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {Chip} from './chip';

export interface ProjectCardProps {
    title: string;
    description: string;
    githubUrl: string;
    tags: string[];
}

export function ProjectCard(props: ProjectCardProps) {
    return (
        <div className="md:px-4 md:py-2 md:rounded-md md:transition-all md:hover:bg-primary/10 md:group-hover/list:opacity-50">
            <Link
                href={props.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex flex-row items-center gap-1 hover:text-primary/80"
            >
                <h3 className="text-base font-bold">{props.title}</h3>
                <ArrowUpRight className="size-4" />
            </Link>
            <p className="text-sm mt-3">{props.description}</p>
            <p className="text-sm my-3">
                {props.tags.map(tag => (
                    <Chip key={tag} tag={tag} />
                ))}
            </p>
        </div>
    );
}
