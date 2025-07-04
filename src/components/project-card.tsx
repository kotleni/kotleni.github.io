import {Button} from '@/components/ui/button';
import Link from 'next/link';

export interface ProjectCardProps {
    title: string;
    description: string;
    githubUrl: string;
    tags: string[];
}

export function ProjectCard(props: ProjectCardProps) {
    return (
        <div className="mb-6">
            <Link href={props.githubUrl} target="_blank" rel="noreferrer">
                <h3 className="text-lg font-bold text-slate-200 hover:text-slate-300">
                    {props.title}
                </h3>
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
