<script setup lang="ts">
import {useDark, usePreferredDark} from '@vueuse/core';
import RainOverlay from './components/RainOverlay.vue';

usePreferredDark();
useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
});
</script>

<template>
    <main class="main">
        <div class="topbar">
            <span class="page-title"
                ><img
                    class="page-icon"
                    width="16"
                    src="/favicon.svg"
                />kotleni's web</span
            >
            <nav class="navbar">
                <RouterLink class="link" to="/">Home</RouterLink>
                <RouterLink class="link" to="/blog">Blog</RouterLink>
            </nav>
        </div>
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
.topbar {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;

    display: flex;
    flex-direction: column;
    align-items: center;
}
.navbar {
    width: 100%;
    padding: 0px;

    display: flex;
    justify-content: center;
    gap: 8px;
}
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
@media screen and (width >= 900px) {
    .main {
        width: 70%;
        max-width: 800px;
    }
}
.page-title {
    display: flex;
    flex-direction: row;
    gap: 8px;
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
