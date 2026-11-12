# next-starter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** react-starter master를 기준으로 Next 15.5(master) / 16.4(next-16) 스타터를 만든다.

**Architecture:** App Router + react-starter 서비스 레이어(api → repository → 화면). repository는 axios 인스턴스 주입 팩토리로 바꿔 클라이언트(`@/repository/index`)와 서버(`@/repository/server`)에서 같은 인터페이스로 쓴다. next-16은 master 위의 단일 커밋.

**Tech Stack:** Next 15.5 / 16.4, React 19.2, TypeScript 5.9, axios, zod 4, zustand 5, vitest 4, ESLint 9 flat config, husky + gitleaks

**Spec:** `docs/specs/2026-11-12-next-starter-design.md`

## Global Constraints

- 원본: `/Users/mac/Documents/workspace/react-starter` master. 그대로 쓰는 파일은 `git show master:<path>`로 복사
- Node 22.12 (`.nvmrc`), 패키지 매니저 npm
- 경로 alias `@/*` → `src/*`, barrel import 규칙(`@/<module>/index`) 유지
- 환경 변수: 브라우저 `NEXT_PUBLIC_*`, 서버 전용 `API_URL`. `APP_ENV`로 `environment/.env.{APP_ENV}.local` 선택
- 주석/커밋 메시지 한국어, 커밋 메시지 형식 `* 설명`
- 제외: HeadComponent, shared/asset, shared/inspector, zod-compiler, envsub, Storybook, Playwright, Docker/nginx, 파이프라인, semgrep/sonar/zap/nuclei

## Review Focus

- `@/repository/server`를 클라이언트 컴포넌트에서 import → `server-only`로 빌드 에러가 나야 함 (Task 3에서 import 확인)
- `APP_ENV` 미지정 실행 → production env로 로드돼야 함 (Task 1 next.config 기본값)
- 외부 API 실패/타임아웃 → `/test` 서버 렌더가 페이지 전체를 죽이지 않고 에러 문구 표시 (Task 5)
- zod 스키마 불일치 응답 → 콘솔 에러만, 렌더는 계속 (기존 `schemaValid` 동작 유지)
- 16에서 `"use cache"` 안의 `cookies()` → 금지. 서버 인터셉터는 주석 예제만 (Task 6)

---

### Task 1: 프로젝트 골격 + 설정

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `next-env.d.ts`(빌드가 생성), `.gitignore`, `.env`, `environment/.env.{development,qa,production}.local`, `src/app/layout.tsx`, `src/app/(app)/layout.tsx`, `src/app/(app)/page.tsx`, `src/app/not-found.tsx`, `src/app/global-error.tsx`, `README.md`
- Copy as-is: `.nvmrc`, `.vscode/`, `.bitbucket/`, `@docs/`, `environment/README.md`, `environment/secrets/README.md`, `environment/tools/README.md`, `configuration/typescript-config/tsconfig.base.json`, `public/`(정적 파일), `src/*/README.md`(pages/routes/layouts/stories 제외)

- [ ] **Step 1:** `package.json` — scripts: `dev`(APP_ENV=development next dev --turbopack), `dev:qa`, `build:dev`, `build:qa`, `build`, `start`, `ts:check`, `lint`, `test`, `test:run`, `test:cover`, `prettier:fix`, `lint:staged`, `gitleaks:*`, `prepare`. deps: next@15.5, react/react-dom 19.2, axios, classnames, dompurify, html-entities, react-device-detect, react-error-boundary, zod, zustand, server-only, dotenv
- [ ] **Step 2:** `next.config.ts` — `dotenv.config({path: [`environment/.env.${APP_ENV ?? 'production'}.local`, '.env'], quiet: true})` 후 `NextConfig` 반환
- [ ] **Step 3:** 앱 셸 — root layout에 `metadata`(title template `%s :: ${NEXT_PUBLIC_APP_TITLE}`, description, keywords), `(app)/layout.tsx` = `<div id="wrap">`, 메인 페이지는 env 값 출력 + `next/image` 샘플
- [ ] **Step 4: Verify** `npm install && npm run build:dev` → 성공, `/` 정적 생성
- [ ] **Step 5: Commit** `* Next 15 프로젝트 골격 구성`

### Task 2: shared 헬퍼 + 품질 도구

**Files:**
- Copy: `src/shared/helper/{addon,axios,entities,format,hash,http-status,url,validation,zod}.ts`, `src/shared/test/*.test.ts`(asset.test 제외), `configuration/eslint-config/**`, `configuration/prettier-config/**`, `.prettierrc.cjs`, `.prettierignore`, `.gitleaks.toml`, `.gitleaksignore`, `scripts/gitleaks/*`, `scripts/husky/ensure-node.sh`, `.husky/pre-commit`
- Create: `src/shared/index.ts`(asset/inspector export 제거), `configuration/vitest-config/vitest.base.config.ts`(viteConfig 병합 제거, `vitestBaseConfig(userConfig?)`), `vitest.config.ts`, `eslint.config.mjs`, `.husky/pre-push`(semgrep 단계 제거)
- Modify: `configuration/eslint-config/eslint.base.config.mjs` — `reactRefresh.configs.vite` → `@next/eslint-plugin-next` flat recommended + core-web-vitals, `globalIgnores`에 `.next`, `next-env.d.ts`, `api` barrel 패턴에 `!@/api/server` 추가

- [ ] **Step 1: Verify** `npm run test:run` → 기존 shared 테스트 전부 PASS
- [ ] **Step 2: Verify** `npm run lint` / `npm run ts:check` → 에러 0
- [ ] **Step 3: Commit** `* shared 헬퍼 및 eslint/prettier/vitest/husky 구성`

### Task 3: 서비스 레이어 (api + repository)

**Files:**
- Copy: `src/api/axios/axios.instance.ts`, `src/api/axios/client/**`(`import.meta.env.VITE_API_URL` → `process.env.NEXT_PUBLIC_API_URL`, `window.location` 리다이렉트 주석은 env 이름만 변경)
- Create: `src/api/axios/server/instance/api.instance.ts`(`import 'server-only'`, `createAxiosInstance({baseURL: process.env.API_URL, adapter: 'fetch'})`), `src/api/axios/server/interceptor/api.interceptor.ts`(`onRequestServer`/`onResponseServer`/`onResponseErrorServer`; `cookies()` 토큰 주입은 주석 예제), `src/api/server.ts`(`export {apiServer}`)
- Modify: `src/repository/common.repository.ts` → `createCommonRepository(api: AxiosInstance): ICommonRepository`, `getTest(config?: AxiosRequestConfig): Promise<AxiosResponse<TTestResponse>>`, `TestSchema`/`TTestResponse` export 유지
- Create: `src/repository/index.ts`(`repository: IRepository = {common: createCommonRepository(apiClient)}`), `src/repository/server.ts`(`import 'server-only'`, apiServer 사용, 같은 `IRepository`)
- Test: `src/repository/test/common.repository.test.ts`

**Interfaces:**
- Produces: `IRepository`, `createCommonRepository(api)`, `repository`(client default export), `repository`(server default export), `TestSchema`

- [ ] **Step 1: 실패 테스트** — `getTest`가 주입된 인스턴스의 `get`을 `'/posts/1/comments'`와 넘긴 config로 호출하는지

```ts
it('주입된 인스턴스로 /posts/1/comments 를 호출한다', async () => {
  const get = vi.fn().mockResolvedValue({data: []});
  const repo = createCommonRepository({get} as unknown as AxiosInstance);
  const config = {fetchOptions: {next: {tags: ['common-test']}}};
  await repo.getTest(config);
  expect(get).toHaveBeenCalledWith('/posts/1/comments', config);
});
```

- [ ] **Step 2:** `npm run test:run` → FAIL (`createCommonRepository` 없음)
- [ ] **Step 3:** 구현
- [ ] **Step 4:** `npm run test:run` → PASS, `npm run ts:check` → 에러 0
- [ ] **Step 5: Commit** `* 서비스 레이어 인스턴스 주입 구조로 이식`

### Task 4: context / providers / components / hooks

**Files:**
- Copy + `'use client'`: `src/context/{device,webview}.context.tsx`, `src/context/index.ts`, `src/providers/ContextCombine.provider.tsx`, `src/providers/index.ts`, `src/hooks/{useIsMounted,useWebView}.ts`, `src/components/SafeHTML/SafeHTML.component.tsx`
- Create: `src/providers/App.provider.tsx`('use client', production이면 `disableReactDevTools()` 1회, `AppContextProviders`로 children 감쌈), `src/components/index.ts`(HeadComponent 제거), `src/zustand.d.ts` 복사
- Modify: `src/app/layout.tsx` — body를 `<AppProvider>`로 감쌈

- [ ] **Step 1: Verify** `npm run build:dev` → 성공 (device context가 서버 렌더에서 `window` 참조 시 에러 없음: `useDeviceSelectors`는 effect 안에서만 UA 읽도록)
- [ ] **Step 2: Commit** `* context, providers, components, hooks 이식`

### Task 5: /test 예제 + middleware

**Files:**
- Create: `src/app/(empty)/layout.tsx`(children만), `src/app/(empty)/test/page.tsx`(서버 컴포넌트), `src/app/(empty)/test/actions.ts`(`'use server'`, `refreshComments(): Promise<void>` → `revalidateTag('common-test')`), `src/containers/test/{ServerComments,ClientComments,RefreshForm,SafeHTMLDemo}.tsx`, `src/middleware.ts`(`export function middleware(req) { return NextResponse.next(); }` + 토큰 체크 주석 예제, `config.matcher`로 정적 파일 제외)

- [ ] **Step 1:** 서버 조회 — `repository.common.getTest({fetchOptions: {next: {revalidate: 60, tags: ['common-test']}}})` → `schemaValid` → 목록. 실패 시 `<p>` 에러 문구 (throw 하지 않음)
- [ ] **Step 2:** 클라이언트 조회 — 기존 `XHRTestComponent` 로직 그대로 (`@/repository/index`)
- [ ] **Step 3:** RefreshForm — `<form action={refreshComments}>` + `useFormStatus`로 pending 표시
- [ ] **Step 4: Verify** `npm run build:dev` → 성공, `npm run start` 후 `/test`에서 서버 목록 · 클라이언트 목록 · 새로고침 동작 확인 (브라우저)
- [ ] **Step 5: Commit** `* /test 서비스 레이어 예제 및 middleware 추가`

### Task 6: next-16 브랜치

**Files:**
- Modify: `package.json`(next@16.4, `dev`의 `--turbopack` 제거), `next.config.ts`(`cacheComponents: true`), `src/app/(empty)/test/page.tsx`/`containers/test/ServerComments.tsx`(`'use cache'` + `cacheLife('minutes')` + `cacheTag('common-test')` 함수로 data만 반환), `src/app/(empty)/test/actions.ts`(`updateTag('common-test')`), `README.md`(16 차이 표)
- Rename: `src/middleware.ts` → `src/proxy.ts` (`export function proxy`)

- [ ] **Step 1:** `git switch -c next-16` 후 위 변경
- [ ] **Step 2: Verify** `npm install`, `ts:check` / `lint` / `test:run` / `build:dev` 성공 (cacheComponents Suspense 에러 없음)
- [ ] **Step 3: Verify** `npm run start` → `/test` 브라우저 확인
- [ ] **Step 4: Commit** `* Next 16 전환 (proxy, Turbopack, Cache Components)`
