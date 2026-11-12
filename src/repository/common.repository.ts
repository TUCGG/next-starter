import {API_ENDPOINT} from '@/api/index';
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {z} from 'zod';

// 캐시 태그 ("use cache" 함수의 cacheTag / Server Action의 updateTag)
export const COMMON_CACHE_TAG = {
  TEST: 'common-test'
} as const;

// Response 스키마 모델
export const TestSchema = z.array(
  z.object({
    postId: z.number(),
    id: z.number(),
    name: z.string(),
    email: z.email(),
    body: z.string()
  })
);

// 스키마 모델을 타입스크립트 타입 변환
export type TTestResponse = z.infer<typeof TestSchema>;

// 레파지토리 인터페이스
export interface ICommonRepository {
  getTest: (config?: AxiosRequestConfig) => Promise<AxiosResponse<TTestResponse>>;
}

/**
 * createCommonRepository
 * @description 레파지토리 구현체 생성 (axios 인스턴스 주입 - 클라이언트: apiClient, 서버: apiServer)
 * @param api - axios 인스턴스
 *
 * @example
 * // 캐시는 호출부의 "use cache" 함수에서 지정 (반환값은 직렬화 가능한 data만)
 * const getComments = async () => {
 *   'use cache';
 *   cacheTag(COMMON_CACHE_TAG.TEST);
 *   return (await repository.common.getTest()).data;
 * };
 */
export const createCommonRepository = (api: AxiosInstance): ICommonRepository => ({
  /** 테스트 데이터 조회 */
  getTest: (config) => api.get<TTestResponse>(`${API_ENDPOINT.TEST}/${1}/comments`, config)
});
