import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import n from 'eslint-plugin-n';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';

export default ts.config(
    // 1. Global Ignores
    {
        ignores: ['**/dist/', '**/build/', '.svelte-kit/', '.next/']
    },

    // 2. Base Configurations
    js.configs.recommended,
    ...ts.configs.recommended,
    ...svelte.configs['flat/recommended'],

    // 3. Plugin Setup & Global Rules
    {
        plugins: {
            'n': n,
            'prettier': prettierPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            }
        },
        rules: {
            'prettier/prettier': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'eqeqeq': 'error',
            'quotes': ['warn', 'single', { avoidEscape: true }],
            'n/no-missing-import': 'off',
            'n/no-unsupported-features/es-syntax': 'off',
        }
    },

    // 4. Svelte Specific Config
    {
        files: ['**/*.svelte'],
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: ts.parser, // Handles the <script> tags
                projectService: true,
                extraFileExtensions: ['.svelte'],
                tsconfigRootDir: import.meta.dirname,
            }
        },
        rules: {
            // Rules for TypeScript inside Svelte
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        }
    },

    // 5. TypeScript Standalone Config
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: ts.parser,
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            }
        }
    },

    // 6. Prettier Override (MUST BE LAST)
    prettierConfig
);