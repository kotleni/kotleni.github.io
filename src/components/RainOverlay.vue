<template>
    <canvas ref="cvs" class="rn-ov"></canvas>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue';

const cvs = ref(null);
let ctx, w, h, req;
let wind = 0;
let time = 0;
const drops = [];
const max = 32;

const rsz = () => {
    if (!cvs.value) return;
    w = cvs.value.width = window.innerWidth;
    h = cvs.value.height = window.innerHeight;
};

const loop = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(174, 194, 224, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';

    time += 0.005;
    wind = Math.sin(time) * 4 + 3;

    ctx.beginPath();
    for (let i = 0; i < max; i++) {
        const p = drops[i];
        const wFactor = wind * (p.s / 10);

        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + wFactor, p.y + p.l);

        p.y += p.s;
        p.x += wFactor;

        if (p.y > h || p.x > w || p.x < -200) {
            p.x = Math.random() * (w + 400) - 200;
            p.y = -p.l;
        }
    }
    ctx.stroke();

    req = requestAnimationFrame(loop);
};

onMounted(() => {
    ctx = cvs.value.getContext('2d', {alpha: true});
    rsz();

    for (let i = 0; i < max; i++) {
        drops.push({
            x: Math.random() * w,
            y: Math.random() * h,
            l: Math.random() * 20 + 10,
            s: Math.random() * 12 + 10,
        });
    }

    window.addEventListener('resize', rsz, {passive: true});
    loop();
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', rsz);
    cancelAnimationFrame(req);
});
</script>

<style scoped>
.rn-ov {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 99999;
}
</style>
