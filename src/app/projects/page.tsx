import {allMyProjects} from '@/data/projects';
import {Title} from '@/components/blog/title';
import {StyledLink} from '@/components/styled-link';

export default function ProjectsPage() {
    return (
        <div className="pt-4">
            <Title text="Projects" />

            {Object.entries(allMyProjects)
                .reverse()
                .map(([year, projects]) => {
                    return (
                        <div key={year}>
                            <div className="font-semibold pt-8 pb-2">
                                {year}
                            </div>
                            <div className="flex flex-col gap-2">
                                {projects.map(project => {
                                    return (
                                        <div
                                            key={project.name}
                                            className="flex flex-col gap-1 text-neutral-500"
                                        >
                                            <StyledLink
                                                className="w-fit"
                                                href={project.url}
                                            >
                                                {project.name}
                                            </StyledLink>{' '}
                                            {project.description}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
        </div>
    );
}
