import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import n from 'eslint-plugin-n';
import globals from 'globals';

export default ts.config(
    {
        ignores: ['**/dist/', '**/build/'],
    },

    js.configs.recommended,
    ...ts.configs.recommended,
    ...vue.configs['flat/recommended'],

    {
        plugins: {
            n,
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
            'prettier/prettier': ['error', {endOfLine: 'lf'}],
            'linebreak-style': ['error', 'unix'],
            'no-var': 'error',
            'prefer-const': 'error',
            eqeqeq: 'error',
            quotes: ['warn', 'single', {avoidEscape: true}],
            'n/no-missing-import': 'off',
            'n/no-unsupported-features/es-syntax': 'off',
        },
    },
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: ts.parser,
                projectService: true,
                extraFileExtensions: ['.vue'],
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
