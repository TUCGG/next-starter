import 'server-only';

import {createAxiosInstance} from '../../axios.instance';
import {onRequestServer, onResponseErrorServer, onResponseServer} from '../interceptor/api.interceptor';

export const apiServer = createAxiosInstance({
  baseURL: process.env.API_URL,
  // [D] Next가 확장한 fetch 사용 → 요청 config의 fetchOptions.next(revalidate, tags) 캐시 옵션 적용
  adapter: 'fetch'
});

apiServer.defaults.timeout = 5000;

apiServer.interceptors.request.use(onRequestServer);
apiServer.interceptors.response.use(onResponseServer, onResponseErrorServer);
