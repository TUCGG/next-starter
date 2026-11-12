import * as Shared from '@/shared/index';
import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';

/** Axios 요청 전 인터셉터 (헤더 설정 등 전처리 수행) */
export const onRequestClient = async (config: InternalAxiosRequestConfig) => {
  try {
    // const accessToken = getCookie('accessToken');
    //
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`; // 헤더 설정
    // }

    // return throw new Error('로그인이 필요합니다.');
    return config;
  } catch (error) {
    return Promise.reject(error);
  }
};

/** Axios 응답 성공 인터셉터 */
export const onResponseClient = async (response: AxiosResponse) => {
  return response;
};

/** Axios 응답 에러 인터셉터 */
export const onResponseErrorClient = async (error: AxiosError) => {
  if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
    console.error('[요청 타임아웃 에러]');
  }

  // XHR 요청 취소 처리
  if (axios.isCancel(error)) {
    if (error.message === 'CANCEL_REQUEST_REFRESH_TOKEN_EXPIRED' || Object.is(error.response, undefined)) {
      console.log('[XHR 요청 취소 처리]', error);
      return;
    }
  }

  // 토큰 인증 처리
  // if (axios.isAxiosError(error)) {
  //   console.log('####', <any>(error as AxiosError));

  //   const {status} = error.response as AxiosResponse;

  //   switch (status) {
  //     case Shared.http.EHTTP_STATUS.INTERNAL_SERVER_ERROR:
  //       window.location.href = process.env.NEXT_PUBLIC_STATIC_PAGE_INTERNAL_SERVER_ERROR;

  //       return Promise.resolve();
  //     default:break;
  //   }
  // }

  // 에러 로그 출력
  Shared.axios.logAxiosErrorWithDatetime(error);

  return Promise.reject(error);
};
