# Next Starter

> 프로젝트의 간단한 설명

`react-starter`의 서비스 레이어(api / repository / shared)와 폴더 규칙을 Next.js App Router로 옮긴 기본 틀

## 브랜치

| 브랜치    | Next | 설명                                                         |
| --------- | ---- | ------------------------------------------------------------ |
| `master`  | 15.5 | 기본 틀 (`middleware.ts`, fetch 캐시 옵션)                   |
| `next-16` | 16.4 | `proxy.ts`, Turbopack 기본, Cache Components (`"use cache"`) |

두 브랜치의 차이는 `git diff master next-16` 으로 확인

> 브랜치 전환 후에는 `npm install` 과 `.next` 삭제가 필요 (이전 버전이 생성한 `.next/types` 가 타입 체크를 깨뜨림)
>
> ```bash
> git switch next-16 && npm install && rm -rf .next
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

- 공통: `.env`
- 환경별: `environment/.env.{development,qa,production}.local` (`APP_ENV`로 선택, 미지정 시 production)
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
- 서버 인스턴스는 `adapter: 'fetch'` 를 사용하므로 Next 캐시 옵션(`fetchOptions.next`)을 그대로 전달 가능
- 사용 예제: `/test`

## 기술 스택 (Tech Stack)

- 프론트엔드: Next.js, React, Zustand, ...

### 문서화 (Documentation)

- [코드 작성 가이드](./@docs/README.md)
- [설계 문서](./docs/specs/2026-11-12-next-starter-design.md)
