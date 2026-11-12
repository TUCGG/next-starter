import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactHooks from 'eslint-plugin-react-hooks';
import security from 'eslint-plugin-security';
import sonarjs from 'eslint-plugin-sonarjs';
import {defineConfig, globalIgnores} from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import {strictSharedImport} from './plugins/rules/index.mjs';

/**
 * eslintBaseConfig
 * @description typescript-eslint를 기반으로 한 ESLint 기본 베이스 설정 반환
 * @param tseslintOptions - typescript-eslint 전용 옵션
 * @param userConfig - 사용자 확장 설정
 * @returns 병합된 Flat ESLint 설정
 *
 * @example
 * import eslintBaseConfig from './configuration/eslint-config/eslint.base.config.mjs';
 *
 * export default eslintBaseConfig(
 *   {
 *     ignores: ['dist']
 *   },
 *   {
 *     files: ['src/*.{ts,tsx}'],
 *     languageOptions: {
 *       parserOptions: {
 *         project: ['./tsconfig.json'] // 프로젝트 TypeScript Config 설정
 *       }
 *     },
 *     rules: {...}
 *   }
 * );
 */
/** @type {import("eslint").Linter.Config} */
export default (...configs) => {
  const _tseslintOptions = configs[0] ?? {};
  const _userConfig = configs[1] ?? {};

  /**
   * getRestrictedImports
   * @description 제한된 모듈에 대해 no-restricted-imports 규칙용 paths, patterns 반환
   * @param modules - 제한 하는 모듈(디렉토리) 이름
   * @returns ESLint > no-restricted-imports용 설정 객체
   */
  const getRestrictedImports = (modules = []) => {
    return modules.reduce(
      (acc, name) => {
        acc.paths.push({
          name: `@/${name}`,
          message: `@/${name}는 반드시 '@/${name}/index' 로 선언해서 사용하세요.`
        });

        acc.patterns.push({
          // server: 서버 전용(server-only) Barrel - index에 섞으면 클라이언트 번들에서 빌드 에러
          group: [`@/${name}/**`, `!@/${name}/index`, `!@/${name}/server`],
          message: `@/${name}는 Barrel (index, server) 파일을 통해 가져오는 방식만 허용됩니다.`
        });

        return acc;
      },
      {paths: [], patterns: []}
    );
  };

  // 제한 모듈 정의
  const restrictedModules = getRestrictedImports([
    'api',
    'components',
    'containers',
    'context',
    'hoc',
    'hooks',
    'providers',
    // 'repository',
    'store'
    // 'stories'
  ]);

  return defineConfig([
    // 기존 ignorePatterns 반영
    globalIgnores(['.next', 'next-env.d.ts', ...(_tseslintOptions?.ignores ?? [])]),
    {
      files: ['src/**/*.{ts,tsx}', ...(_userConfig.files ?? [])],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        // reactHooks.configs['recommended-latest'],
        reactHooks.configs.flat.recommended, // 리액트 최신 ESLint 반영
        nextPlugin.configs['core-web-vitals'], // Next 권장 + Core Web Vitals 규칙

        security.configs.recommended,
        sonarjs.configs.recommended,

        ...(_userConfig.extends ?? [])
      ],
      languageOptions: {
        ecmaVersion: 2024, // 최신 설정 반영
        globals: globals.browser,
        sourceType: 'module',
        parserOptions: {
          ecmaVersion: 2024,
          sourceType: 'module',
          project: ['./tsconfig.json'], // TypeScript 설정 파일 경로
          ...(_userConfig.languageOptions?.parserOptions ?? {})
        },
        ...(_userConfig.languageOptions ?? {})
      },
      plugins: {
        // 'react-hooks': reactHooks,
        // 'react-refresh': reactRefresh,
        security,
        'custom-rules': {
          // 커스텀 룰
          rules: {
            'strict-shared-import': strictSharedImport
          }
        },
        ...(_userConfig.plugins ?? {})
      },
      rules: {
        // React Hook
        // ...reactHooks.configs.recommended.rules,
        // 'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react-hooks/set-state-in-effect': 'off',
        'react-hooks/refs': 'off',
        'react-hooks/immutability': 'off',

        // JSX
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off',

        // TypeScript
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-empty-object-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/await-thenable': 'off',
        // '@typescript-eslint/ban-types': 'error', // NOTE kjw eslint 9버전 부터 호환성문제 발생
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/restrict-template-expressions': 'error',

        // JavaScript
        eqeqeq: 'error',
        curly: 'error',
        'no-unused-vars': 'off',
        'no-extra-boolean-cast': 'error',
        'no-unsafe-optional-chaining': 'off',

        // 제한된 import
        // 'no-restricted-syntax': [
        //   'error',
        //   {
        //     selector: 'ImportDeclaration[source.value="@/shared"] ImportSpecifier',
        //     message: '공통 모듈은 반드시 "import * as Shared from @/shared" 형태로만 사용해야 합니다.'
        //   }
        //   // {
        //   //   selector: "ImportDeclaration[source.value='@/shared'] ImportDefaultSpecifier",
        //   //   message: "공통 모듈은 반드시 import * as Shared from '@/shared' 형태로만 사용해야 합니다."
        //   // }
        // ],
        'no-restricted-imports': [
          'error',
          {
            //   paths: [
            //     // {
            //     //   name: '@/shared',
            //     //   importNames: ['default'],
            //     //   message: `공통 모듈에서 default import는 사용할 수 없습니다. 다음과 같이 사용하세요: import * as Shared from '@/shared/index';`
            //     // },
            //     // {
            //     //   name: '@/shared',
            //     //   importNames: ['*'],
            //     //   message: `공통 모듈의 개별 요소를 직접 import하지 마세요. 반드시 namespace import를 사용하세요: import * as Shared from '@/shared/index';`
            //     // }
            //   ],
            //   patterns: [
            //     // {
            //     //   group: ['@/shared/(?!index$).*'],
            //     //   message: `공통 모듈의 하위 경로에서 직접 import하지 마세요. 반드시 '@/shared/index'를 통해 접근하세요.`
            //     // }
            //   ]
            paths: [...restrictedModules.paths],
            patterns: [...restrictedModules.patterns]
          }
        ],

        // 커스텀 Rule
        'custom-rules/strict-shared-import': 'error',

        // 웹 접근성
        'jsx-a11y/media-has-caption': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',

        // Security
        'security/detect-object-injection': 'warn',
        'security/detect-non-literal-regexp': 'warn',
        'security/detect-unsafe-regex': 'error',
        'security/detect-eval-with-expression': 'error',

        // SonarJS
        'sonarjs/no-commented-code': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/cognitive-complexity': 'warn',
        'sonarjs/no-identical-functions': 'warn',
        'sonarjs/no-duplicated-branches': 'warn',
        'sonarjs/no-all-duplicated-branches': 'warn',
        'sonarjs/no-redundant-optional': 'warn',
        'sonarjs/function-return-type': 'warn',

        // 사용자 정의 확장
        ...(_userConfig.rules ?? {})
      }
    }
  ]);
};
