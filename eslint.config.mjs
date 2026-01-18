import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import n from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import ts from 'typescript-eslint';

export default ts.config(
    {
        ignores: ['**/dist/', '**/build/'],
    },

    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'],

    {
        plugins: {
            n: n,
            prettier: prettierPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                APP_VERSION: 'readonly',
            },
        },
        rules: {
            'prettier/prettier': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            eqeqeq: 'error',
            quotes: ['warn', 'single', {avoidEscape: true}],
            'n/no-missing-import': 'off',
            'n/no-unsupported-features/es-syntax': 'off',
        },
    },
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: ts.parser,
                projectService: true,
                extraFileExtensions: ['.svelte'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: ts.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    prettierConfig,
);
