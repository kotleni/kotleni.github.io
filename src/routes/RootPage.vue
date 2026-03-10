<script setup lang="ts">
import JourneyItem from '@/components/JourneyItem.vue';
import {
    aboutMe,
    birthDate,
    journeyItems,
    myEmail,
    skillsStack,
    skillsStackAdditional,
    socials,
} from '@/data/about';
import {badges} from '@/data/badges';
import {computed} from 'vue';

const appVersion = APP_VERSION;

const ageString = computed(() => {
    const now = new Date();
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }
    return `${years} years, ${months} months`;
});
</script>

<template>
    <div class="blocks">
        <div class="container">
            <div class="namediv">
                <h1 class="realname">Viktor Varenik</h1>
                <h1 class="nickname">(kotleni)</h1>
            </div>
            {{ aboutMe }}
        </div>
        <div class="container socials-container">
            <h3>socials.</h3>
            <div>
                Interested in a conversation? Drop DM's over socials bellow, or
                mail me at <a :href="'mailto:' + myEmail">{{ myEmail }}</a
                >. Ask me anything about my work, projects, or anything else.
            </div>
            <div class="socials-list">
                <a
                    v-for="social in socials"
                    :key="social.name"
                    :href="social.url"
                    class="social-item"
                >
                    <component :is="social.icon" v-if="social.icon" />
                    <template v-if="!social.icon">{{ social.name }}</template>
                </a>
            </div>
        </div>
        <div class="container two-rows">
            <div class="table-info-column">
                <h3>verbose.</h3>
                <div class="table-line">
                    <p class="field-title">Position</p>
                    Full-stack engineer
                </div>
                <div class="table-line">
                    <p class="field-title">Location</p>
                    Ukraine, Kremenchuk
                </div>
                <div class="table-line">
                    <p class="field-title">Timezone</p>
                    GMT+2
                </div>
                <div class="table-line">
                    <p class="field-title">Age</p>
                    up {{ ageString }}
                </div>
            </div>
            <div class="table-info-column">
                <h3>languages.</h3>
                <div class="table-line">
                    <p class="field-title">Ukrainian</p>
                    Native
                </div>
                <div class="table-line">
                    <p class="field-title">Russian</p>
                    Native
                </div>
                <div class="table-line">
                    <p class="field-title">English</p>
                    Upper-Intermediate (B2)
                </div>
            </div>
        </div>
        <div class="container">
            <h3>skills.</h3>
            <div class="skills-list">
                <span
                    v-for="skill in skillsStack"
                    :key="skill"
                    class="skill-chip"
                    >{{ skill }}</span
                >
            </div>
            <h4 class="subtitle">Additional stack:</h4>
            <div class="skills-list">
                <span
                    v-for="skill in skillsStackAdditional"
                    :key="skill"
                    class="skill-chip"
                    >{{ skill }}</span
                >
            </div>
        </div>
        <div class="container">
            <h3>journey.</h3>
            <div class="journey-list">
                <div
                    v-for="journey in journeyItems"
                    :key="journey.companyName"
                    class="journey-item"
                >
                    <JourneyItem
                        :title="journey.title"
                        :company-title="journey.companyName"
                        :company-url="journey.companyUrl"
                        :working-dates="journey.date"
                        :description="journey.description"
                    />
                </div>
            </div>
        </div>
        <div class="container">
            <h3>badges.</h3>
            <div class="badges-list">
                <a
                    v-for="badge in badges"
                    :key="badge.label"
                    class="badge-item"
                    :href="badge.targetUrl ?? undefined"
                >
                    <img :src="badge.imageUrl" :aria-label="badge.label" />
                </a>
            </div>
        </div>

        <div class="bottom-info">
            <p>version {{ appVersion }}</p>
            <!-- | -->
            <!-- <a href="/status">status</a> -->
        </div>
    </div>
</template>

<style scoped>
.blocks {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.container {
    width: 100%;
    padding: 16px;

    background-color: var(--color-card);
    border: 0px solid var(--color-primary);
    border-radius: 6px;
}
@media screen and (width < 600px) {
    .container {
        border-radius: 0px;
    }
}
.two-rows {
    gap: 16px;
    display: flex;
    flex-direction: row;
}
@media screen and (width < 600px) {
    .two-rows {
        flex-direction: column;
        gap: 12px;
    }
}
.table-info-column {
    display: flex;
    flex-direction: column;
    gap: 0px;
    flex-grow: 1;
}
.table-line {
    padding-bottom: 0px;

    display: flex;
    flex-direction: row;
    gap: 4px;
    justify-content: space-between;
    align-items: center;

    border-color: var(--color-muted);
    border-bottom-style: solid;
    border-bottom-width: 1px;

    font-size: 14px;
    font-weight: 400;
}
.field-title {
    font-size: 14px;
    font-weight: 600;
}
.namediv {
    padding-bottom: 10px;
}
.realname {
    font-weight: 600;
    font-size: 1.5em;
}
.nickname {
    font-weight: 500;
    font-size: 0.9em;
    color: var(--color-foreground);
    opacity: 0.6;
}
.socials-list {
    display: flex;
    flex-direction: row;
    gap: 8px;
}
.socials-list svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
}
.skills-list {
    padding-top: 8px;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    gap: 8px;
}
.skill-chip {
    padding: 4px 6px 4px 6px;

    background-color: var(--color-secondary);
    color: var(--color-secondary-foreground);

    font-size: 0.875rem;
}
.skill-chip:hover {
    background-color: var(--color-primary);
}
.subtitle {
    padding-top: 16px;
    font-size: 0.9rem;
}
.socials-container {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.journey-list {
    padding-top: 8px;
    display: flex;
    flex-direction: column;
    flex-flow: wrap;
    gap: 8px;
}
.badges-list {
    padding-top: 8px;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;
    gap: 8px;
}
.badge-item {
    cursor: pointer;
}
.badge-item:hover {
    opacity: 0.8;
}
.bottom-info {
    width: 100%;
    text-align: center;
    color: var(--color-muted-foreground);
    font-weight: 400;
    font-size: 0.9rem;
    padding: 16px 0 16px 0;
}
</style>
