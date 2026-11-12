// [D] 클라이언트 인스턴스 내보내기 (서버 인스턴스는 '@/api/server')
export {apiClient} from './axios/client/instance/api.instance';

// [D] 단순 구조 (Flat) - 모든 API 경로를 하나의 객체로 나열
// export const API_ENDPOINT = {
//   SIGNUP: '/signup',
//   LOGIN: '/login',
//   LIST: '/course/list',
// } as const;

// [D] 계층 구조 (Nested) - 도메인(기능)별로 경로를 그룹화
// export const API_ENDPOINT = {
//   AUTH: {
//     SIGNUP: '/signup',
//     LOGIN: '/login',
//   },
//   COURSE: {
//     LIST: '/course/list',
//   },
// } as const;

// REST API 엔드 포인트
export const API_ENDPOINT = {
  TEST: '/posts'
} as const;
