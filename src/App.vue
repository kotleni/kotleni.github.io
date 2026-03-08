<script setup lang="ts">
import {useDark, usePreferredDark} from '@vueuse/core';

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
            kotleni's web
            <nav class="navbar">
                <RouterLink class="link" to="/">Home</RouterLink>
            </nav>
        </div>
        <RouterView />
    </main>
</template>

<style scoped>
.topbar {
    width: 100%;
    padding: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
}
.navbar {
    width: 100%;
    padding: 0px;

    display: flex;
    justify-content: center;
    gap: 4px;
}
.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
@media screen and (width >= 900px) {
    .main {
        width: 80%;
    }
}
</style>
