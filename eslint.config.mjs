import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import eslintComments from 'eslint-plugin-eslint-comments';

export default tseslint.config(
  {
    root: true,
    ignores: ['dist', 'babel.config.js', 'metro.config.js'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      'eslint-comments': eslintComments,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      'eslint-comments/no-aggregating-enable': 'off', // Example rule from eslint-comments
      'eslint-comments/no-unused-disable': 'warn',
    },
  },
);
