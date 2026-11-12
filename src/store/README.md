# store

> 애플리케이션의 전역 데이터 상태 관리 정의

## 역할

- **전역 상태 관리**: 애플리케이션 전반에서 사용할 상태를 관리
- **상태 변경 로직**: 상태를 업데이트하는 로직을 간결하게 정의
- **상태 공유**: 컴포넌트 간 상태 공유를 쉽게 처리
- **상태 업데이트**: `Zustand`의 `set` 메서드를 이용하여 상태를 변경

### 필수 사항

- `zustand` 의 **slice** 패턴을 사용
- 참조: <https://zustand.docs.pmnd.rs/guides/slices-pattern>

### 파일 구조 예시

```text
|- example.slice.ts # 개별 상태 관리
|- index.ts # 엔트리 파일 (export 집합)
```
