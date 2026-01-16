import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import {execSync} from 'child_process';
import pkg from './package.json';

const commitHash = execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const appVersion = `${pkg.version}-${commitHash}-${branch}`;

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte(), tailwindcss()],
    define: {
        APP_VERSION: JSON.stringify(appVersion),
    },
});
