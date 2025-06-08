import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';

export default defineConfig([
  { files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.lint.json',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterOverload: true,
          exceptAfterSingleLine: true,
        },
      ],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/padding-line-between-statements': [
        'error',
        // Return statements
        {blankLine: 'always', prev: '*', next: 'return'},
        // Import statements
        {blankLine: 'always', prev: 'import', next: '*'},
        {blankLine: 'any', prev: 'import', next: 'import'},
      ],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'always'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        },
      ],
      '@typescript-eslint/no-unnecessary-condition': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
    },
  },
]);
