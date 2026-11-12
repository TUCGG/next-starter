import * as Shared from '@/shared/index';
import type {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

// import {cookies} from 'next/headers';

/** Axios 요청 전 인터셉터 (서버) */
export const onRequestServer = async (config: InternalAxiosRequestConfig) => {
  // [D] 사용자 토큰 전달 (Server Component / Server Action / Route Handler)
  // 주의: 캐시되는 요청(fetchOptions.next, "use cache")에는 사용자별 쿠키를 붙이지 말 것
  // const accessToken = (await cookies()).get('accessToken')?.value;
  //
  // if (accessToken) {
  //   config.headers.Authorization = `Bearer ${accessToken}`;
  // }

  return config;
};

/** Axios 응답 성공 인터셉터 (서버) */
export const onResponseServer = async (response: AxiosResponse) => {
  return response;
};

/** Axios 응답 에러 인터셉터 (서버) */
export const onResponseErrorServer = async (error: AxiosError) => {
  // 에러 로그 출력
  Shared.axios.logAxiosErrorWithDatetime(error);

  return Promise.reject(error);
};
