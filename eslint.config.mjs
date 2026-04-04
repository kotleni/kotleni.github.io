import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import n from 'eslint-plugin-n';
import reactHooks from 'eslint-plugin-react-hooks';
import ts from 'typescript-eslint';
import globals from 'globals';

export default ts.config(
    {
        ignores: ['**/dist/', '**/build/'],
    },
    js.configs.recommended,
    ...ts.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            n,
            prettier: prettierPlugin,
            'react-hooks': reactHooks,
        },
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                APP_VERSION: 'readonly',
            },
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
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
        files: ['**/*.mjs'],
        plugins: {
            n,
            prettier: prettierPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
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
    prettierConfig,
);
