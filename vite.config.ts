import {svelte} from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import {execSync} from 'child_process';
import {FontaineTransform} from 'fontaine';
import path from 'path';
import {defineConfig} from 'vite';
import markdownPrecompile from './build-src/markdown-precompile';
import pkg from './package.json';

const commitHash = execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const appVersion = `${pkg.version}-${commitHash}-${branch}`;

const fontaineOptions = {
    fallbacks: ['Courier New', 'Roboto Mono', 'Noto Sans Mono'],
    resolvePath: (id: string) => new URL(`./public${id}`, import.meta.url),
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        tailwindcss(),
        markdownPrecompile(),
        FontaineTransform.vite(fontaineOptions),
    ],
    define: {
        APP_VERSION: JSON.stringify(appVersion),
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
