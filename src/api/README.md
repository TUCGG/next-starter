# api

> API 경로(URL 엔드포인트)를 정의하고, XHR 통신 모듈 구성 정의

## 역할

- REST API 엔드포인트 경로 상수 정의 (도메인별)
- XHR 통신용 인스턴스(Axios 등) 설정 및 공통 인터셉터 구성
- API 구조 통일성과 유지보수성 향상

### 파일 구조 예시

```text
|- [axios]
|-- [client] # 클라이언트
|--- [instance] # 기본 인스턴스 설정
|---- api.instance.ts
|--- [interceptor] # 요청/응답 인터셉터 정의
|---- api.interceptor.ts
|-- [server] # 서버
|--- [instance] # 기본 인스턴스 설정
|---- api.instance.ts
|--- [interceptor] # 요청/응답 인터셉터 정의
|---- api.interceptor.ts
|- index.ts # REST API 엔드포인트 정의, API 인스턴스 (export)
```
