/// <reference types="vite/client" />

declare const APP_VERSION: string;

declare module '*.md' {
    const html: string;
    export default html;
}
