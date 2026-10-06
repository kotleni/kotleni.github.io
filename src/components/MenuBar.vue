<script setup lang="ts">
</script>

<template>
    <div class="menu-bar">
        <div class="left-side">
            <p class="site-name">kotleni</p>
        </div>

        <div class="right-side">
            <span class="item">about</span>
            <span class="item">portfolio</span>
            <span class="item">blog</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .menu-bar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        padding: 4px 8px;

        .left-side {
            display: flex;

            .site-name {
                cursor: pointer;
                color: var(--accent);
            }
        }

        .right-side {
            display: flex;
            flex-direction: row;
            gap: 8px;

            .item {
                cursor: pointer;
                color: var(--text);

                &:hover {
                    color: white;
                }
            }
        }
    }
</style>
