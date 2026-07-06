import globals from 'globals';
import tseslint from 'typescript-eslint';
import base, { configs as baseConfigs, ignores } from './base.js';

/**
 * ESLint flat config for Node.js packages and services.
 *
 * @param {string} tsconfigRootDir Absolute path to the consuming package root.
 */
export function createNodeConfig(tsconfigRootDir) {
  return tseslint.config(
    ...ignores,
    ...baseConfigs,
    {
      languageOptions: {
        globals: globals.node,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
    },
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  );
}

export default base;
