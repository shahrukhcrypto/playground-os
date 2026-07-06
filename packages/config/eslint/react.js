import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import { configs as baseConfigs, ignores } from './base.js';

/**
 * ESLint flat config for React applications.
 *
 * @param {string} tsconfigRootDir Absolute path to the consuming package root.
 */
export function createReactConfig(tsconfigRootDir) {
  return tseslint.config(
    ...ignores,
    ...baseConfigs,
    {
      languageOptions: {
        globals: globals.browser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    ...(react.configs.flat.recommended ? [react.configs.flat.recommended] : []),
    ...(react.configs.flat['jsx-runtime'] ? [react.configs.flat['jsx-runtime']] : []),
    reactHooks.configs['recommended-latest'],
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    {
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  );
}
