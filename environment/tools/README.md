# environment > tools

> 품질·보안 점검 도구에서 사용하는 설정 파일들을 분리하여 관리

## 역할

- Gitleaks, Nuclei, OWASP ZAP, Semgrep, SonarQube 등 도구별 환경변수 관리
- 로컬 실행 환경과 CI 실행 환경의 설정 분리
- 민감 정보가 포함될 수 있는 `.local` 파일의 Git 추적 방지

### 파일 구조 예시

```text
├─ .env.gitleaks.local # Secret 탐지 / 민감정보 검사
├─ .env.nuclei.local # 알려진 취약점/CVE/설정 오류 및 인프라 보안 분석
├─ .env.owasp-zap.local # 웹 취약점 동적 분석 (DAST)
├─ .env.semgrep.local # 정적 보안 분석
├─ .env.sonarqube.local # 전체 코드 품질 분석
```

---

## 환경 변수 파일

### .env.gitleaks.local

- Secret 탐지 / 민감정보 검사

```text
# gitleaks Docker 이미지
# 값을 비우면 스크립트 기본값 (ghcr.io/gitleaks/gitleaks:latest) 사용
export GITLEAKS_IMAGE=ghcr.io/gitleaks/gitleaks:v8.30.0

# Gitleaks Docker 컨테이너 이름
# staged 스캔은 이름 뒤에 -staged를 붙여 사용
# 값을 비우면 Docker가 임의 이름을 사용
export GITLEAKS_CONTAINER_NAME=gitleaks

# true로 설정하면 git 히스토리 대신 현재 워킹트리 기준으로 검사한다.
# export GITLEAKS_NO_GIT=true
```

### .env.nuclei.local

- 알려진 취약점/CVE/설정 오류 및 인프라 보안 분석

```text
# Nuclei Docker 이미지
# 값을 비우면 스크립트 기본값 (projectdiscovery/nuclei:latest) 사용
export NUCLEI_IMAGE=projectdiscovery/nuclei:v3.8.0

# Nuclei Docker 컨테이너 이름
# 값을 비우면 Docker가 임의 이름을 사용
export NUCLEI_CONTAINER_NAME=nuclei

# 기본 대상 URL
export NUCLEI_TARGET_URL=<https://example.com>

# 다중 대상 URL
# 값이 있으면 NUCLEI_TARGET_URL보다 우선 사용한다.
export NUCLEI_TARGET_URLS='
<https://example.com/main>
'

# 검사 심각도
# export NUCLEI_SEVERITY=medium,high,critical
export NUCLEI_SEVERITY=high,critical
# 검사 태그
# cves: 공개 CVE 취약점 검사. 알려진 제품/프레임워크 취약점 탐지용이며 요청이 많고 오래 걸릴 수 있다.
# exposure: 민감 정보/파일/관리자 페이지/API 문서/디버그 엔드포인트 등 외부 노출 여부 검사.
# misconfig: CORS, 보안 헤더, 디렉터리 리스팅, 기본 설정 오류 등 서버/인프라 설정 오류 검사.
#
# 권장:
# - 빠른 점검: exposure,misconfig
# - 정밀 점검: cves,exposure,misconfig
export NUCLEI_TAGS='cves,exposure,misconfig'

# 제외 태그
# export NUCLEI_EXCLUDE_TAGS='dos,fuzz'

# 요청 부하 제어
export NUCLEI_RATE_LIMIT=3
export NUCLEI_TIMEOUT=10
export NUCLEI_RETRIES=1
export NUCLEI_STATS_INTERVAL=5
export NUCLEI_OMIT_RAW=true

# 인증 세션이 필요한 화면까지 점검하려면 쿠키를 넣는다.
export NUCLEI_COOKIE='
cw-token=<YOUR_CW_TOKEN>
JSESSIONID=<YOUR_JSESSIONID>
'

# 필요 시 추가 헤더를 줄 단위로 넣는다.
# export NUCLEI_HEADERS='
# Authorization: Bearer ...
# X-Custom-Header: value
# '

# 디버그 모드 활성화
export NUCLEI_DEBUG=false
```

### .env.owasp-zap.local

- 웹 취약점 동적 분석 (DAST)

```text
# ZAP Docker 이미지
# 값을 비우면 스크립트 기본값 (ghcr.io/zaproxy/zaproxy:stable) 사용
export ZAP_IMAGE=ghcr.io/zaproxy/zaproxy:2.17.0

# ZAP Docker 컨테이너 이름
# 값을 비우면 Docker가 임의 이름을 사용
export ZAP_CONTAINER_NAME=owasp-zap

# 기본 대상 URL
export ZAP_TARGET_URL=<https://example.com>

# 로그인 세션 유효성 확인 URL
export ZAP_AUTH_CHECK_URL=<https://example.com/main>

# 인증 정보
export ZAP_USERNAME=<YOUR_TEST_USERNAME>
export ZAP_PASSWORD=<YOUR_TEST_PASSWORD>

# 로그인 세션 쿠키
export ZAP_COOKIE='
cw-token=<YOUR_CW_TOKEN>
JSESSIONID=<YOUR_JSESSIONID>
'

# 로그인 후 주요 화면 seed URL (로그인 후 탐색 대상)
export ZAP_CRAWL_URLS='
/course
/course/list
/course/new
/course/edit/<COURSE_ID>
/course/draft/<DRAFT_ID>
'

# 필요 시 API 직접 호출 대상 (화면 클릭만으로 호출되지 않는 API)
# export ZAP_API_PATHS='
# /auth/check,/auth/info
# '

# 탐색 제외 URL 패턴
export ZAP_EXCLUDE_URL_PATTERN='
\/lcms\/drafts
\/player\/course
'

# Playwright 기반 SPA 탐색 설정
export ZAP_MAX_ACTIONS=100
export ZAP_UNSAFE_ACTION_PATTERN='로그아웃|삭제|탈퇴|취소|나가기|초기화|reset|delete|logout|sign out'

# Active Scan 실행 여부
# false: 로그인 세션 기반 탐색 + Passive Scan 리포트만 생성
# true: Passive Scan 이후 공격성 payload 기반 Active Scan까지 실행
export ZAP_ACTIVE_SCAN=true

# false: 기준 URL만 Active Scan
# true : 기준 URL 하위 경로까지 재귀적으로 Active Scan
export ZAP_ACTIVE_SCAN_RECURSE=false

# ZAP JVM 메모리 설정
export ZAP_JAVA_OPTS=-Xmx2048m
```

### .env.semgrep.local

- 정적 보안 분석

```text
# Semgrep Docker 이미지
# 값을 비우면 스크립트 기본값 (semgrep/semgrep:latest) 사용
export SEMGREP_IMAGE=semgrep/semgrep:1.164.0

# Semgrep Docker 컨테이너 이름
# 값을 비우면 Docker가 임의 이름을 사용
export SEMGREP_CONTAINER_NAME=semgrep
```

### .env.sonarqube.local

전체 코드 품질 분석

```text
# Sonar Scanner Doker 이미지
# 값을 비우면 스크립트 기본값 (sonarsource/sonar-scanner-cli:latest) 사용
export SONAR_SCANNER_IMAGE=sonarsource/sonar-scanner-cli:11.5.0.2154_7.3.0

# Sonar Scanner Docker 컨테이너 이름
# 값을 비우면 Docker가 임의 이름을 사용
export SONAR_SCANNER_CONTAINER_NAME=sonarqube-scanner

# 공통 설정
export SONAR_HOST_URL=http://115.68.14.123:5900
export SONAR_TOKEN=<YOUR_SONAR_TOKEN>
export PR_BASE=develop
```
