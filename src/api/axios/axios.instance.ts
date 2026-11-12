import * as Shared from '@/shared/index';
import type {AxiosInstance, CreateAxiosDefaults} from 'axios';

/**
 * createAxiosInstance
 * @description axios 인스턴스 생성
 * @returns AxiosInstance
 *
 * @example
 * const axiosInstance = createAxiosInstance();
 * axiosInstance.get('/api/xxx');
 */
export const createAxiosInstance = (config?: CreateAxiosDefaults): AxiosInstance => {
  // 커스텀 axios 인스턴스 주입
  const instance = Shared.axios.defaultAxiosInstance({
    withCredentials: false,
    // timeout: 5000,
    // [D] 요청 취소는 요청별 AbortController signal 사용 (config.signal)
    ...config
  });

  return instance;
};
