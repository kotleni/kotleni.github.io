import {execSync} from 'child_process';
import path from 'path';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {FontaineTransform} from 'fontaine';
import pkg from './package.json';
import markdownPrecompile from './build-src/markdown-precompile';

const commitHash = execSync('git log --pretty=format:"%h" -n1')
    .toString()
    .trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const appVersion = `${pkg.version}-${commitHash}-${branch}`;

const fontaineOptions = {
    fallbacks: ['Courier New', 'Roboto Mono', 'Noto Sans Mono'],
    resolvePath: (id: string) => new URL(`./public${id}`, import.meta.url),
};

export default defineConfig({
    plugins: [
        tailwindcss(),
        react(),
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
