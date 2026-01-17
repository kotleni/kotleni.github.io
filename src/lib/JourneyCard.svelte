<script lang="ts">
    interface Props {
        title: string;
        companyTitle: string | undefined;
        companyUrl: string | undefined;
        workingDates: string;
        description: string;
    }

    const {title, companyTitle, companyUrl, workingDates, description}: Props =
        $props();
</script>

<div class="group flex flex-row gap-16px w-full py-0">
    <div
        class="min-h-full min-w-2px bg-neutral-200 group-hover:bg-primary"
    ></div>
    <div class="w-full">
        <div class="flex justify-between min-w-full text-sm">
            <div class="text-xs">
                <p class="text-[16px]">{title}</p>
                <div
                    class="flex flex-row gap-1"
                    hidden={companyTitle === undefined}
                >
                    <p>at,</p>
                    <a
                        hidden={companyUrl === undefined}
                        href={companyUrl}
                        class="underline"
                    >
                        {companyTitle}
                    </a>
                    <p hidden={companyUrl !== undefined} class="underline">
                        {companyTitle}
                    </p>
                </div>
            </div>
            <div class="text-md">{workingDates}</div>
        </div>
        <p class="mt-2 text-sm">{description}</p>
    </div>
</div>
