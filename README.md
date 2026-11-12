# Next Starter

> 프로젝트의 간단한 설명

`react-starter`의 서비스 레이어(api / repository / shared)와 폴더 규칙을 Next.js App Router로 옮긴 기본 틀

## 브랜치 (릴리즈 라인)

| 브랜치            | Next | 설명                                                         |
| ----------------- | ---- | ------------------------------------------------------------ |
| `master`          | 15.5 | 기본 틀 (`middleware.ts`, fetch 캐시 옵션)                   |
| `release/next-16` | 16.4 | `proxy.ts`, Turbopack 기본, Cache Components (`"use cache"`) |

- 버전별 릴리즈 라인으로 독립 관리 (master 변경을 자동으로 따라가지 않음)
- 양쪽에 필요한 수정은 각 브랜치에 따로 반영 (`git cherry-pick`)
- 16 전환 시점의 차이: `release/next-16` 의 첫 커밋 (`* Next 16 전환 ...`)

> 브랜치 전환 후에는 `npm install` 과 `.next` 삭제가 필요 (이전 버전이 생성한 `.next/types` 가 타입 체크를 깨뜨림)
>
> ```bash
> git switch release/next-16 && npm install && rm -rf .next
> ```

## 시작하기

```bash
npm install
npm run dev        # APP_ENV=development
npm run build:dev  # 개발 환경 빌드
npm run start:dev  # 개발 환경 실행 (빌드와 같은 APP_ENV로 실행)
```

| 스크립트                           | 설명                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `dev` / `dev:qa` / `dev:prod`      | 환경별 개발 서버                                                        |
| `build:dev` / `build:qa` / `build` | 환경별 빌드                                                             |
| `start:dev` / `start:qa` / `start` | 환경별 실행 (서버 전용 env는 실행 시점에 읽으므로 빌드와 같은 환경으로) |
| `ts:check` / `lint` / `test:run`   | 타입 체크 / ESLint / 단위 테스트                                        |

## 환경 변수

- 공통: `environment/.env` (루트 `.env` 는 Next가 자동 로드해 환경별 값보다 우선하므로 사용하지 않음)
- 환경별: `environment/.env.{development,qa,production}.local` (`APP_ENV`로 선택, 미지정 시 production)
- 시크릿: `environment/secrets/.env.secret.{APP_ENV}.local` (git 제외)
- 우선순위: 환경별 → 시크릿 → 공통 (이미 설정된 시스템 환경 변수가 가장 우선)
- `NEXT_PUBLIC_*` 는 브라우저 번들에 포함, 접두사 없는 값(`API_URL`)은 서버 전용
- 로드 위치: `next.config.ts`

## 스캐폴딩 구조

```text
|- [src]
|-- [app] # 라우팅 (페이지, 레이아웃, 에러/404)
|--- [(app)] # 공통 레이아웃(#wrap)이 적용되는 페이지 그룹
|--- [(empty)] # 레이아웃 없는 페이지 그룹
|-- [api] # API 엔드포인트 및 XHR 인스턴스 정의 (client / server)
|-- [assets] # 정적 리소스 (import 해서 사용)
|-- [components] # 프레젠테이션 컴포넌트
|-- [containers] # 컨테이너 컴포넌트
|-- [context] # 컨텍스트 정의
|-- [hoc] # 고차 컴포넌트
|-- [hooks] # 커스텀 훅
|-- [providers] # 프로바이더
|-- [repository] # 레파지토리 (index: 클라이언트, server: 서버)
|-- [shared] # 공통 유틸 함수
|-- [store] # 상태관리
|-- [typings] # 타입 정의 (전역)
```

## 서비스 레이어

```ts
// 서버 컴포넌트 / Server Action
import repository from '@/repository/server';

// 클라이언트 컴포넌트
import repository from '@/repository/index';

const {data} = await repository.common.getTest();
```

- 두 repository는 같은 인터페이스(`IRepository`)를 가지며, 주입된 axios 인스턴스만 다름
- 캐시는 호출부의 `"use cache"` 함수에서 `cacheLife` / `cacheTag` 로 지정, 무효화는 Server Action의 `updateTag`
- 사용 예제: `/test`

## Next 16 주의사항 (Cache Components)

- `"use cache"` 안에서는 `cookies()` / `headers()` 사용 불가 → 사용자별 요청(토큰 등)은 캐시 함수 밖에서 호출
- `"use cache"` 안에서 throw 된 에러는 바깥에서 `catch` 해도 prerender(빌드)가 실패 → 캐시 함수 안에서 처리
- 캐시 수명이 짧거나(`cacheLife('seconds')`) 런타임 데이터를 쓰는 컴포넌트는 `<Suspense>` 로 감싸야 빌드됨
- 반환값은 직렬화 가능해야 함 → `AxiosResponse` 가 아닌 `data` 만 반환
- `next build` 는 lint를 실행하지 않음 → `npm run lint` 별도 실행 (pre-push 포함)

## 기술 스택 (Tech Stack)

- 프론트엔드: Next.js, React, Zustand, ...

### 문서화 (Documentation)

- [코드 작성 가이드](./@docs/README.md)
- [설계 문서](./docs/specs/2026-11-12-next-starter-design.md)
