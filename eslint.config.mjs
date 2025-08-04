import {FlatCompat} from '@eslint/eslintrc';
import pluginJest from 'eslint-plugin-jest';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...compat.extends('plugin:@tanstack/eslint-plugin-query/recommended'),
    ...compat.extends('prettier'),
    ...compat.plugins('@tanstack/query'),
    {
        files: ['**/__tests__/**/*.[jt]s?(x)', '**/*.{test,spec}.[jt]s?(x)'],
        plugins: {jest: pluginJest},
        rules: {...pluginJest.configs.recommended.rules},
    },
];

export default eslintConfig;
