import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import validateFilename from 'eslint-plugin-validate-filename';
import tseslint from 'typescript-eslint';

const config = [
  // 제외할 파일/폴더
  {
    ignores: ['.next/**', 'out/**', 'dist/**', 'build/**', 'next-env.d.ts', 'node_modules/**'],
  },

  // 기본 JavaScript 권장 설정
  js.configs.recommended,

  // TypeScript 설정
  ...tseslint.configs.recommended,

  // 전역 설정
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      '@next/next': nextPlugin,
      prettier: prettierPlugin,
      'validate-filename': validateFilename,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // React 규칙
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',

      // React Hooks 규칙
      ...reactHooksPlugin.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'warn',

      // Next.js 규칙
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // TypeScript 규칙
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // 기타 규칙
      'react/prop-types': 'off',
      'require-jsdoc': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],

      // 파일명 검증
      'validate-filename/naming-rules': [
        'error',
        {
          rules: [
            {
              case: 'pascal',
              target: 'src/components/**/*',
              excludes: ['src/components/**/hooks/**/*'],
            },
            {
              case: 'camel',
              target: '**/hooks/**',
            },
          ],
        },
      ],

      // 미사용 import 제거
      'unused-imports/no-unused-imports': 'error',
    },
  },

  // Prettier 설정 (규칙 충돌 방지)
  prettierConfig,
];

export default config;
