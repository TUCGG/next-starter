import {createAxiosInstance} from '../../axios.instance';
import {onRequestClient, onResponseClient, onResponseErrorClient} from '../interceptor/api.interceptor';

export const apiClient = createAxiosInstance({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

apiClient.defaults.timeout = 5000;

apiClient.interceptors.request.use(onRequestClient);
apiClient.interceptors.response.use(onResponseClient, onResponseErrorClient);
