import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export const ignores = [
  {
    ignores: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/.turbo/**', '**/coverage/**'],
  },
];

/** @type {import('eslint').Linter.Config[]} */
export const configs = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];

/** @type {import('eslint').Linter.Config[]} */
export default [...ignores, ...configs];
