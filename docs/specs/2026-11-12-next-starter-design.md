# next-starter 설계

> 기준: `react-starter` master (ca76489) · 작성일 2026-11-12

## 목적

새 Next.js 프로젝트를 시작할 때 그대로 가져다 쓰는 기본 틀.
`react-starter`의 서비스 레이어(api / repository / shared)와 폴더 규칙을 유지하고,
Next 자체 기능이 크게 바뀐 15 → 16 구간을 브랜치로 나눠 둔다.

## 브랜치

| 브랜치            | Next   | React | 설명                                                                                   |
| ----------------- | ------ | ----- | -------------------------------------------------------------------------------------- |
| `master`          | 15.5.x | 19.2  | 기본 틀                                                                                |
| `release/next-16` | 16.4.x | 19.2  | master에서 분기한 릴리즈 라인. 첫 커밋 = 16 전환 (마이그레이션 포인트), 이후 독립 관리 |

## 폴더 구조

```text
src/
├─ app/                       # 파일 기반 라우팅 (react-starter의 pages + routes + Router + layouts 대체)
│  ├─ layout.tsx              # <html>, metadata(HeadComponent 대체), Providers
│  ├─ (app)/layout.tsx        # AppLayout (<div id="wrap">)
│  ├─ (app)/page.tsx          # 메인
│  ├─ (empty)/test/page.tsx   # 서비스 레이어 사용 예제
│  ├─ not-found.tsx
│  └─ global-error.tsx
├─ api/
│  ├─ axios/axios.instance.ts
│  ├─ axios/client/...        # 브라우저 인스턴스 (NEXT_PUBLIC_API_URL)
│  ├─ axios/server/...        # 서버 인스턴스 (server-only, adapter: 'fetch', API_URL)
│  ├─ index.ts                # apiClient + API_ENDPOINT
│  └─ server.ts               # apiServer
├─ repository/
│  ├─ common.repository.ts    # createCommonRepository(api) 팩토리
│  ├─ index.ts                # 클라이언트용 repository
│  └─ server.ts               # 서버용 repository (server-only)
├─ components/ containers/ context/ hoc/ hooks/ providers/ shared/ store/ typings/
├─ middleware.ts              # (master) / proxy.ts (release/next-16)
```

- `src/pages`는 두지 않는다 (Next가 Pages Router로 인식).
- 브라우저 의존 컴포넌트/컨텍스트는 `'use client'`.

## 서비스 레이어

- repository는 axios 인스턴스를 주입받는 팩토리. 인터페이스(`IRepository`)와 호출 방식(`repository.common.getTest()`)은 기존과 동일.
- 클라이언트: `import repository from '@/repository/index'` (apiClient)
- 서버: `import repository from '@/repository/server'` (apiServer, `server-only`)
- repository 함수는 `config?: AxiosRequestConfig`를 받는다. 캐시 옵션은 호출부에서 넘긴다 → repository 코드는 두 브랜치 동일.
- 서버 인스턴스는 `adapter: 'fetch'` → Next가 패치한 fetch를 타므로 `fetchOptions.next`(revalidate/tags) 사용 가능.
- 서버 인터셉터의 `cookies()` 토큰 주입은 주석 예제로만 둔다 (16의 `"use cache"` 안에서는 `cookies()` 사용 불가).

## 환경 변수

- `VITE_*` → 브라우저 노출 값은 `NEXT_PUBLIC_*`, 서버 전용 값(`API_URL`)은 접두사 없음.
- 공통 `environment/.env` + `APP_ENV`별 `environment/.env.{development,qa,production}.local` + 시크릿 `environment/secrets/.env.secret.{APP_ENV}.local`.
  `next.config.ts`에서 dotenv로 로드 (우선순위: 환경별 → 시크릿 → 공통). 루트 `.env`는 Next가 먼저 자동 로드해 우선순위가 뒤집히므로 두지 않는다.

## 15 → 16 차이 (release/next-16 전환 커밋 범위)

| 항목                   | master (15.5)                                     | release/next-16 (16.4)                                             |
| ---------------------- | ------------------------------------------------- | ------------------------------------------------------------------ |
| 요청 가로채기          | `middleware.ts` / `export function middleware`    | `proxy.ts` / `export function proxy`                               |
| 번들러                 | `next dev --turbopack`, build는 webpack           | dev/build 모두 Turbopack 기본                                      |
| 캐시                   | 호출부 `fetchOptions: {next: {revalidate, tags}}` | `cacheComponents: true` + `"use cache"` / `cacheLife` / `cacheTag` |
| 무효화 (Server Action) | `revalidateTag(tag)`                              | `updateTag(tag)`                                                   |

공통으로 처음부터 반영: `params`/`cookies()`는 `await`, lint는 `eslint .` 직접 실행.

## `/test` 예제

1. 서버 컴포넌트: `@/repository/server` 조회 → zod `schemaValid` → 목록 렌더
2. 클라이언트 컴포넌트: `@/repository/index`로 `useEffect` 조회
3. Server Action 폼: 캐시 태그 무효화 후 재조회
4. SafeHTML 데모

## 제외 (Vite 전용 또는 범위 밖)

HeadComponent(→ metadata), `shared/asset`(import.meta.glob), `shared/inspector`(react-dev-inspector),
zod-compiler, envsub, Storybook, Playwright, Docker/nginx, bitbucket-pipelines, sonar/semgrep/zap/nuclei.

## 툴링

- `configuration/` 구조 유지
  - eslint: `reactRefresh.configs.vite` → `@next/eslint-plugin-next`, barrel 규칙에 `@/api/server` 예외
  - vitest: 독립 설정 (jsdom + tsconfig paths)
  - prettier, tsconfig 유지 (+ Next 플러그인)
- husky: pre-commit(gitleaks staged + lint-staged), pre-push(gitleaks, lint, ts:check, test:run, npm audit)
- 복사: `.gitleaks.toml`, `.gitleaksignore`, `.nvmrc`, `.vscode`, `.bitbucket`, `@docs`, 폴더별 README

## 검증 (브랜치별)

1. `npm run ts:check` / `npm run lint` / `npm run test:run`
2. `npm run build:dev` (16: cacheComponents Suspense 빌드 에러 없음)
3. `npm run start` 후 `/`, `/test`에서 서버 렌더 목록, 클라이언트 조회, Server Action 동작 확인
