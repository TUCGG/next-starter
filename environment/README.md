# environment

> 각종 환경 변수나 설정 파일들을 분리하여 관리

## 역할

- Dev, QA, Prod, 테스트 등 각 환경에 맞는 설정을 구분하여 관리

### 전역 공통 환경 설정 파일

- `environment/.env` 파일에서 관리 (루트 `.env` 는 Next가 자동 로드해 환경별 값보다 우선하므로 사용하지 않음)
- 우선순위: 환경별(`.env.{APP_ENV}.local`) → 시크릿(`secrets/.env.secret.{APP_ENV}.local`) → 공통(`.env`), 로드 위치: `next.config.ts`

### 파일 구조 예시

```text
├─ [environment]
│  ├─ [secrets]
│  │  ├─ .env.secret.development.local # 개발 환경 시크릿
│  │  ├─ .env.secret.qa.local # 검증 환경 시크릿
│  │  └─ .env.secret.production.local # 프로덕션 환경 시크릿
│  │
│  ├─ [tools]
│  │  ├─ .env.gitleaks.local # Secret 탐지 / 민감정보 검사
│  │  ├─ .env.nuclei.local # 알려진 취약점/CVE/설정 오류 및 인프라 보안 분석
│  │  ├─ .env.owasp-zap.local # 웹 취약점 동적 분석 (DAST)
│  │  ├─ .env.semgrep.local # 정적 보안 분석
│  │  └─ .env.sonarqube.local # 전체 코드 품질 분석
│  │
|  ├─ .env # 공통 환경
|  ├─ .env.development.local # 개발 환경
|  ├─ .env.qa.local # 검증 환경
|  └─ .env.production.local # 프로덕션 환경
```
