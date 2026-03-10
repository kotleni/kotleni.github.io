import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {execSync} from 'child_process';
import pkg from './package.json';
import path from 'path';
import {FontaineTransform} from 'fontaine';
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

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
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
