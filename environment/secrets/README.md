# environment > secrets

> 외부 노출 시 보안 문제가 발생할 수 있는 시크릿 환경 변수를 환경별로 관리

## 역할

- API 키, 인증 토큰, 클라이언트 시크릿 등 민감한 환경 변수 분리 관리
- 공개 환경 설정 파일과 시크릿 환경 설정 파일 분리
- 배포 및 실행 환경별 시크릿 값 관리

### 필수 사항

- 파일명은 `.env.secret.{environment}.local` 형식으로 작성
- 실제 시크릿 값은 README, 이슈, 커밋 메시지 등에 기록하지 않음
- 시크릿 환경 변수 파일은 저장소에 커밋하지 않고 각 실행 환경에서 별도로 관리

### 파일 구조 예시

```text
├─ .env.secret.development.local # 개발 환경 시크릿
├─ .env.secret.qa.local # 검증 환경 시크릿
├─ .env.secret.production.local # 프로덕션 환경 시크릿
```
