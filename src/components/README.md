# components

> 재사용 가능한 UI 컴포넌트 정의

## 역할

- 재사용 가능한 **Atomic UI 컴포넌트** 관리
- 스타일과 props 기반으로 유연하게 동작
- 상태 관리, API 연동 등은 포함하지 않음 (필요 시 `containers`에서 처리)

### 스타일 관리

- 작고 재사용 가능한 UI 단위
- 자체 스타일 또는 props 기반 스타일 적용

### 파일 구조 예시

```text
|- [Example]
|-- Example.component.tsx # 프레젠테이션 컴포넌트
|-- Example.component.stories.tsx # 스토리북 UI 테스트
|-- Example.component.module.css # 스타일
|- index.ts # 엔트리 파일 (export 집합)
```
