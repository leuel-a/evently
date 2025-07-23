import {FlatCompat} from '@eslint/eslintrc';
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
];

export default eslintConfig;
