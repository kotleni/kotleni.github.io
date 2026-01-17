<script lang="ts">
    import {allMyProjects} from '@/data/projects';
    import type {Project} from '@/data/projects';
    import Title from '@/lib/Title.svelte';
    import StyledLink from '@/lib/StyledLink.svelte';

    const entries = Object.entries(allMyProjects);
    const totalProjects = entries.reduce(
        (acc, [, projects]) => acc + projects.length,
        0,
    );
    const yearsCount = entries.length;
    const avgPerYear =
        yearsCount > 0 ? (totalProjects / yearsCount).toFixed(1) : '0';

    const mostProductive = entries.reduce(
        (max, [year, projects]) =>
            projects.length > max.count ? {year, count: projects.length} : max,
        {year: '', count: 0},
    );

    const sortedEntries = [...entries].reverse();
    const maxCount = mostProductive.count || 1;
</script>

{#snippet statItem(label: string, value: string)}
    <span class="mr-2">{label}: {value}</span>
{/snippet}

{#snippet projectBar(year: string, count: number)}
    {@const width = (count / maxCount) * 100}
    <div class="flex items-center gap-3">
        <div class="w-10 text-neutral-500 tabular-nums">{year}</div>
        <div class="flex-1 h-3 bg-neutral-800">
            <div class="h-full bg-neutral-500" style:width="{width}%"></div>
        </div>
        <div class="w-6 text-right text-neutral-400 tabular-nums">{count}</div>
    </div>
{/snippet}

{#snippet projectCard(project: Project)}
    <div>
        <div class="flex items-baseline justify-between">
            <div class="flex items-center gap-2">
                {#if project.url}
                    <StyledLink
                        class="text-white hover:text-neutral-300 font-medium"
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {project.name}
                    </StyledLink>
                {:else}
                    <span class="text-white font-medium">{project.name}</span>
                {/if}

                {#if !project.url}
                    <span class="text-xs text-neutral-500">Closed source</span>
                {/if}
            </div>

            {#if project.platforms?.length}
                <div class="flex flex-wrap gap-1.5">
                    {#each project.platforms as platform (platform)}
                        <span
                            class="px-1.5 py-0.5 text-xs bg-neutral-800 text-neutral-400"
                        >
                            {platform}
                        </span>
                    {/each}
                </div>
            {/if}
        </div>

        {#if project.description}
            <p class="mt-1 text-sm text-neutral-500">{project.description}</p>
        {/if}
    </div>
{/snippet}

<div class="pt-4">
    <Title text="Projects" />

    <div class="mt-6 mb-8 text-sm text-neutral-500">
        {@render statItem('Total', totalProjects.toString())}
        {@render statItem('Years', yearsCount.toString())}
        {@render statItem('Avg/year', avgPerYear)}
        <span>Peak: {mostProductive.year} ({mostProductive.count})</span>
    </div>

    <div class="mb-12 text-xs">
        <div class="text-neutral-400 mb-2">Projects per year</div>
        <div class="space-y-1">
            {#each sortedEntries as [year, projects] (year)}
                {@render projectBar(year, projects.length)}
            {/each}
        </div>
    </div>

    {#each sortedEntries as [year, projects] (year)}
        <div class="mb-12 last:mb-0">
            <h2 class="font-semibold text-lg pb-3 text-white">{year}</h2>
            <div class="space-y-6">
                {#each projects as project (project)}
                    {@render projectCard(project)}
                {/each}
            </div>
        </div>
    {/each}
</div>
