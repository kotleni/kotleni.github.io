<script setup lang="ts">
import {House, NotebookText} from 'lucide-vue-next';
import {useDark, usePreferredDark} from '@vueuse/core';
import RainOverlay from './components/RainOverlay.vue';

usePreferredDark();
useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
});

const navigationItems = [
    {
        to: '/',
        label: 'Home',
        description: 'About and links',
        icon: House,
    },
    {
        to: '/blog',
        label: 'Blog',
        description: 'Posts and notes',
        icon: NotebookText,
    },
];
</script>

<template>
    <main class="main">
        <header class="topbar">
            <RouterLink class="brand" to="/">
                <span class="brand-mark">
                    <img class="page-icon" width="18" src="/favicon.svg" />
                </span>
                <span class="brand-copy">
                    <span class="page-title">kotleni's web</span>
                    <span class="page-subtitle"
                        >personal corner on the internet</span
                    >
                </span>
            </RouterLink>
            <nav class="navbar" aria-label="Primary navigation">
                <RouterLink
                    v-for="item in navigationItems"
                    :key="item.to"
                    v-slot="{href, navigate, isActive, isExactActive}"
                    :to="item.to"
                    custom
                >
                    <a
                        :href="href"
                        class="nav-link"
                        :class="{
                            'nav-link-active':
                                item.to === '/' ? isExactActive : isActive,
                        }"
                        :aria-current="
                            (item.to === '/' ? isExactActive : isActive)
                                ? 'page'
                                : undefined
                        "
                        @click="navigate"
                    >
                        <component :is="item.icon" class="nav-icon" />
                        <span class="nav-copy">
                            <span class="nav-label">{{ item.label }}</span>
                            <span class="nav-description">{{
                                item.description
                            }}</span>
                        </span>
                    </a>
                </RouterLink>
            </nav>
        </header>
        <RouterView v-slot="{Component}">
            <Transition name="fade" mode="out-in">
                <component :is="Component" />
            </Transition>
        </RouterView>
        <RainOverlay />
    </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.main {
    width: min(100%, 880px);
    padding: 12px 0 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.topbar {
    width: 100%;
    padding: 12px;
    margin-bottom: 18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    background-color: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 6px;
}

.navbar {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    flex-wrap: wrap;
}

.brand {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    color: inherit;
    text-decoration: none;
}

.brand:hover {
    color: inherit;
    background: transparent;
}

.brand-mark {
    width: 42px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 6px;
    background-color: var(--color-secondary);
    border: 1px solid var(--color-border);
}

.page-icon {
    display: block;
}

.brand-copy {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 3px;
}

.page-title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.01em;
}

.page-subtitle {
    color: var(--color-muted-foreground);
    font-size: 0.78rem;
    line-height: 1.2;
}

.nav-link {
    min-width: 0;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 6px;
    border: 1px solid var(--color-border);
    background-color: transparent;
    color: var(--color-muted-foreground);
    text-decoration: none;
    transition:
        background-color 0.2s ease,
        color 0.2s ease,
        border-color 0.2s ease;
}

.nav-link:hover {
    color: var(--color-foreground);
    background-color: var(--color-secondary);
    border-color: var(--color-border);
}

.nav-link-active {
    color: var(--color-foreground);
    background-color: color-mix(
        in srgb,
        var(--color-primary) 10%,
        var(--color-card) 90%
    );
    border-color: color-mix(
        in srgb,
        var(--color-primary) 30%,
        var(--color-border) 70%
    );
}

.nav-icon {
    width: 17px;
    height: 17px;
    flex-shrink: 0;
}

.nav-copy {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.nav-label {
    font-size: 0.92rem;
    font-weight: 700;
    line-height: 1;
}

.nav-description {
    font-size: 0.72rem;
    line-height: 1.1;
    color: inherit;
    opacity: 0.75;
}

@media screen and (width < 720px) {
    .main {
        padding-top: 0;
    }

    .topbar {
        padding: 12px;
        border-radius: 0;
        flex-direction: column;
        align-items: stretch;
    }

    .navbar {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .nav-link {
        width: 100%;
    }
}

@media screen and (width < 520px) {
    .page-subtitle,
    .nav-description {
        display: none;
    }

    .nav-link {
        justify-content: center;
    }
}

@keyframes marquee {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-100%);
    }
}
</style>
