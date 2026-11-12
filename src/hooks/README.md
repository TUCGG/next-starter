# hooks

> React 컴포넌트에서 재사용 가능한 상태 관리 및 부수 효과 로직을 캡슐화한 커스텀 훅 정의

## 역할

- 상태 관리, API 호출, 이벤트 처리 등 반복되는 로직 추출
- 컴포넌트 간 로직 재사용 및 분리
- React 내장 훅(useState, useEffect 등)을 조합하여 커스텀 훅 제작

### 파일명 규치

- `use` 접두어를 사용

### 파일 구조 예시

```text
|- useExample.ts # 커스텀 훅
|- index.ts # 엔트리 파일 (export 집합)
```
