import eslintBaseConfig from './configuration/eslint-config/eslint.base.config.mjs';

/** @type {import("eslint").Linter.Config} */
export default eslintBaseConfig(
  {
    ignores: [
      // 'node_modules/',
      // 'public/',
    ]
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json']
      }
    },
    rules: {
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'off'

      // JavaScript
      // curly: 'off'
    }
  }
);
