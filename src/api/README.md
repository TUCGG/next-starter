# api

> API 경로(URL 엔드포인트)를 정의하고, XHR 통신 모듈 구성 정의

## 역할

- REST API 엔드포인트 경로 상수 정의 (도메인별)
- XHR 통신용 인스턴스(Axios 등) 설정 및 공통 인터셉터 구성
- API 구조 통일성과 유지보수성 향상

### 파일 구조 예시

```text
|- [axios]
|-- axios.instance.ts # 공통 axios 인스턴스 생성
|-- [client] # 클라이언트
|--- [instance] # 기본 인스턴스 설정
|---- api.instance.ts
|--- [interceptor] # 요청/응답 인터셉터 정의
|---- api.interceptor.ts
|-- [server] # 서버 (server-only, adapter: 'fetch' → Next 캐시 옵션 전달)
|--- [instance] # 기본 인스턴스 설정
|---- api.instance.ts
|--- [interceptor] # 요청/응답 인터셉터 정의
|---- api.interceptor.ts
|- index.ts # REST API 엔드포인트 정의, 클라이언트 인스턴스 (export)
|- server.ts # 서버 인스턴스 (export) - 서버 컴포넌트 / Server Action 에서만 import
```
