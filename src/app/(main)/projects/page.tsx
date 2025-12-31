import { allMyProjects } from '@/data/projects';
import { Title } from '@/components/title';
import { StyledLink } from '@/components/styled-link';

export default function ProjectsPage() {
    const entries = Object.entries(allMyProjects);

    const totalProjects = entries.reduce((acc, [, projects]) => acc + projects.length, 0);
    const yearsCount = entries.length;
    const avgPerYear = yearsCount > 0 ? (totalProjects / yearsCount).toFixed(1) : '0';

    const mostProductive = entries.reduce(
        (max, [year, projects]) =>
            projects.length > max.count ? { year, count: projects.length } : max,
        { year: '', count: 0 }
    );

    const sortedEntries = [...entries].reverse();
    const maxCount = mostProductive.count || 1;

    return (
        <div className="pt-4">
            <Title text="Projects" />

            <div className="mt-6 mb-8 text-sm text-neutral-500">
                <span className="mr-6">Total: {totalProjects}</span>
                <span className="mr-6">Years: {yearsCount}</span>
                <span className="mr-6">Avg/year: {avgPerYear}</span>
                <span>Peak: {mostProductive.year} ({mostProductive.count})</span>
            </div>

            <div className="mb-12 text-xs">
                <div className="text-neutral-500 mb-2">Projects per year</div>
                <div className="space-y-1">
                    {sortedEntries.map(([year, projects]) => {
                        const count = projects.length;
                        const width = (count / maxCount) * 100;

                        return (
                            <div key={year} className="flex items-center gap-3">
                                <div className="w-10 text-neutral-500 tabular-nums">{year}</div>
                                <div className="flex-1 h-3 bg-neutral-800">
                                    <div
                                        className="h-full bg-neutral-500"
                                        style={{ width: `${width}%` }}
                                    />
                                </div>
                                <div className="w-6 text-right text-neutral-400 tabular-nums">
                                    {count}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {sortedEntries.map(([year, projects]) => (
                <div key={year} className="mb-12 last:mb-0">
                    <h2 className="font-semibold text-lg pb-3 text-white">{year}</h2>
                    <div className="space-y-4">
                        {projects.map((project) => (
                            <div key={project.name} className="text-neutral-500">
                                <StyledLink
                                    className="text-white hover:text-neutral-300 font-medium"
                                    href={project.url}
                                    target="_blank"
                                >
                                    {project.name}
                                </StyledLink>
                                {project.description && (
                                    <p className="mt-1 text-sm">{project.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
