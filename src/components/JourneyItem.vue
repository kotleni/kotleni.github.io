<script setup lang="ts">
interface Props {
    title: string;
    companyTitle: string;
    companyUrl: string | null;
    workingDates: string;
    description: string;
}

defineProps<Props>();
</script>

<template>
    <div class="job">
        <div class="timeline"></div>

        <div class="content">
            <div class="header">
                <div class="title">
                    <p class="job-title">{{ title }}</p>

                    <div v-if="companyTitle" class="company">
                        <p>at,</p>

                        <a
                            v-if="companyUrl"
                            :href="companyUrl"
                            class="company-link"
                        >
                            {{ companyTitle }}
                        </a>

                        <p v-else class="company-text">
                            {{ companyTitle }}
                        </p>
                    </div>
                </div>

                <div class="dates">
                    {{ workingDates }}
                </div>
            </div>

            <p class="description">
                {{ description }}
            </p>
        </div>
    </div>
</template>

<style scoped>
.job {
    display: flex;
    flex-direction: row;
    gap: 16px;
    width: 100%;
    padding: 0;
}

.timeline {
    min-height: 100%;
    min-width: 2px;
    background: #e5e5e5;
    transition: background 0.2s;
}

.job:hover .timeline {
    background: var(--color-primary);
}

.content {
    width: 100%;
}

.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
}

.title {
    font-size: 12px;
}

.job-title {
    font-size: 16px;
}

.company {
    display: flex;
    flex-direction: row;
    gap: 4px;
}

.company-link {
    text-decoration: underline;
}

.company-text {
    text-decoration: underline;
}

.dates {
    font-size: 14px;
}

.description {
    margin-top: 8px;
    font-size: 14px;
}
</style>
