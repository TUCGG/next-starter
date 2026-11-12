# repository

> API 호출, 외부 데이터 소스와의 통신 로직을 모듈화하여 정의

## 역할

- REST API, GraphQL 등 외부 데이터 통신 추상화
- axios 등 HTTP 클라이언트를 통한 API 호출 정의
- 도메인별 데이터 요청 함수 분리 및 재사용
- 서비스와의 명확한 계층 분리 (프레젠테이션 로직과 분리)

### 파일 구조 예시

```text
|- example.repository.ts # API 레파지토리
|- index.ts # 엔트리 파일 (export 집합)
```
