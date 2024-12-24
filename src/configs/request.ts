import axios, {
  AxiosError,
  AxiosRequestConfig,
} from 'axios'
import { baseApiUrl } from './constants'


const request = axios.create({ baseURL: baseApiUrl });

const setHeaders = (config: any) => {
  const token = localStorage.getItem('auth')
  config.headers = {
    ...config.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  return config
}

request.interceptors.request.use(
  (config: AxiosRequestConfig) => setHeaders(config),
  (error: AxiosError) => Promise.reject(error)
)

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      window.location.href = "/login";
      localStorage.clear();
    }
    if (error) {
      console.log('error');
    }
    return Promise.reject(error.response.data);
  }
)

export default request
