# containers

> 뷰(UI) 중심의 `components`와 구분하여, `비즈니스 로직`, `상태 관리`, `API 연동`, `context 사용` 등을 포함하는 **복합 컴포넌트** 를 정의

## 역할

- `components`를 조합하고 내부 상태를 관리
- 데이터 패칭 및 처리 로직 포함
- `Redux`, `Zustand`, `Context` 등 외부 상태 연동
- UI보다 기능에 집중된 레이어

### 스타일 관리 (필요 시 최소한만)

- 스타일보다는 로직 중심
- 레이아웃 구조나 전역 클래스 정도만 필요할 수 있음

### 파일 구조 예시

```text
|- [Example]
|-- Example.container.tsx # 컨테이너 컴포넌트
|-- Example.container.stories.tsx # 스토리북 UI 테스트
|-- Example.container.module.css # 스타일 (필요한 경우 최소한만)
|- index.ts # 엔트리 파일 (export 집합)
```
