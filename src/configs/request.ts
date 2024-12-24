import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { baseApiUrl } from './constants';

const request = axios.create({ baseURL: baseApiUrl });

const setHeaders = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('auth_token');

    // Ensure headers are always defined
    config.headers = config.headers || {};
    config.headers.Authorization = token ? `Bearer ${token}` : '';

    return config;
};

request.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => setHeaders(config),
    (error: AxiosError) => {
        console.error('Request Interceptor Error:', error.message);
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        if (status === 401) {
            console.warn('Unauthorized access, redirecting to login...');
            localStorage.clear();
            window.location.href = '/login';
        } else {
            console.error(`API error: ${status}`, error.response?.data);
        }
        return Promise.reject(error.response?.data || error.message);
    }
);

export default request;
