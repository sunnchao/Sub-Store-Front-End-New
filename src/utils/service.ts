import type { AxiosError } from 'axios';
import axios from 'axios';

import { CONSTANTS } from '../constants';

const getBaseUrl = (): string => {
  const dataStr = localStorage.getItem(CONSTANTS.BACKEND_API.LS_KEY);
  const data = dataStr
    ? (JSON.parse(dataStr) as Settings.BackendApiUrl)
    : CONSTANTS.BACKEND_API.INITIAL;
  return (
    data.apis.find(api => api.name === data.current)?.url
    ?? import.meta.env.VITE_API_URL
    ?? 'https://sub.store'
  );
};

export const service = axios.create({
  baseURL: getBaseUrl(),
  timeout: 1000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type GetOptions = {
  params?: Record<string, string>
  onSucceed?: () => void
  onError?: (err: APIRes.Error['error']) => void
};
export const getData = async <T>(
  url: string,
  options?: GetOptions,
): Promise<T> => {
  const { params, onSucceed, onError } = options ?? {};
  return new Promise((resolve) => {
    service
      .get<APIRes.Response<T>>(url, { params })
      .then((res) => {
        if (res.status === 200 && res.data.status === 'success') {
          onSucceed?.();
          resolve(res.data.data);
        } else {
          console.error(
            'Get 被 resolve 但响应不为 200 或 status 不为 success：',
            res,
          );
        }
      })
      .catch((e) => {
        const err = e as AxiosError<APIRes.Error>;
        console.error('Sub-Store >>> Get 请求失败，原始错误：', err);
        onError?.(err.response!.data.error);
      });
  });
};
