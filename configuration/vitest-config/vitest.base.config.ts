import {defineConfig, type ViteUserConfig} from 'vitest/config';

/**
 * vitestBaseConfig
 * @description vitest 기본 베이스 설정 반환 (Next는 vite.config가 없으므로 독립 설정)
 * @param [userConfig] - vitest 설정 정의 옵션
 * @returns vitest 설정 객체
 *
 * @example
 * import vitestBaseConfig from './configuration/vitest-config/vitest.base.config';
 *
 * export default vitestBaseConfig({
 *   test: {
 *     coverage: {
 *       reportsDirectory: './reports/test/coverage'
 *     }
 *   }
 * });
 */
export default (userConfig?: ViteUserConfig) => {
  return defineConfig({
    ...userConfig,
    resolve: {
      tsconfigPaths: true, // tsconfig paths(@/*) 해석 (Vite 8 내장)
      // server-only 는 react-server 환경이 아니면 throw → 테스트에서는 빈 모듈로 대체 (서버 전용 모듈 테스트 가능)
      alias: {'server-only': `${process.cwd()}/node_modules/server-only/empty.js`},
      ...userConfig?.resolve
    },
    oxc: {jsx: {runtime: 'automatic'}}, // tsconfig jsx: preserve(Next 전용)와 무관하게 테스트 JSX 변환
    test: {
      environment: 'jsdom',
      include: ['src/**/*.test.{ts,tsx}'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        reportsDirectory: './reports/test/coverage',
        ...(userConfig?.test?.coverage ?? {})
      },
      ...(userConfig?.test ?? {})
    }
  });
};
