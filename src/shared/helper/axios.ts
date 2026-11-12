import axios, {type AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type CreateAxiosDefaults} from 'axios';

/**
 * defaultAxiosInstance
 * @description axios 기본 인스턴스 생성
 * @param config
 * @returns AxiosInstance
 */
export const defaultAxiosInstance = (config?: CreateAxiosDefaults): AxiosInstance => {
  // const cancelTokenSource = axios.CancelToken.source();

  // 커스텀 axios 인스턴스 주입
  const instance = axios.create({
    // withCredentials: true,
    timeout: 5000,
    ...config
  });

  return instance;
};

interface IAxiosError {
  isAxiosError: boolean;
  message: string;
  code: string;
  response: {
    status: number;
    data: {
      message: string;
      code: string;
      [key: string]: any; // 다른 데이터 필드
    };
    config: AxiosRequestConfig | null;
    request: any | null;
  };
}

/**
 * createAxiosError
 * @description 커스텀 Axios 에러
 * @param message
 * @param code
 * @param config
 * @param request
 * @param response
 * @returns {{response: (*&{status: number}), isAxiosError: boolean}}
 *
 * @example
 * throw createAxiosError('"AccessToken" is missing from scope.', '0001', null, null, {
 *  status: 400,
 *  data: {
 *    errors: {
 *      userId: '이미 사용중인 아이디입니다.',
 *      nickname: '닉네임을 입력해주세요.'
 *    }
 *  }
 * });
 */
export const createAxiosError = (
  // prettier-ignore
  message: string = '',
  code: string = '',
  config: AxiosRequestConfig | null = null,
  request: any | null = null,
  response: Partial<AxiosResponse<any>>
): IAxiosError => {
  return {
    isAxiosError: true,
    message,
    code,
    response: {
      status: response.status || 400,
      data: {
        message,
        code,
        ...response.data
      },
      // statusText: null,
      // headers: null,
      config,
      request
    }
  };
};

/**
 * logAxiosErrorWithDatetime
 * @description 에러 로그에 날짜와 시간을 추가하여 출력
 * @param error
 */
export const logAxiosErrorWithDatetime = (error: AxiosError) => {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }).format(now);

  console.error(`[에러 로그]: ${formattedDate} - ${error.message}`);
};
