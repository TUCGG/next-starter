# environment

> 각종 환경 변수나 설정 파일들을 분리하여 관리

## 역할

- Dev, QA, Prod, 테스트 등 각 환경에 맞는 설정을 구분하여 관리

### 전역 공통 환경 설정 파일

- 프로젝트 루트 경로의 `.env` 파일 에서 관리

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
|  ├─ .env.development.local # 개발 환경
|  ├─ .env.qa.local # 검증 환경
|  └─ .env.production.local # 프로덕션 환경
|
├─ .env # 공통 환경
```
