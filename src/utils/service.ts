import type { AxiosError } from 'axios';
import axios from 'axios';

// import { CONSTANTS } from '../constants';

// const getBaseUrl = (): string => {
//   const dataStr = localStorage.getItem(CONSTANTS.BACKEND_API.LS_KEY);
//   const data = dataStr
//     ? (JSON.parse(dataStr) as Settings.BackendApiUrl)
//     : CONSTANTS.BACKEND_API.INITIAL;
//   return (
//     data.apis.find(api => api.name === data.current)?.url ??
//     import.meta.env.VITE_API_URL ??
//     'https://sub.store'
//   );
// };

export const service = axios.create({
  // baseURL: getBaseUrl(),
  timeout: 30000,
});

service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

type RequestOptions = {
  onSucceed?: () => void;
  onError?: (originalError: AxiosError<APIRes.Error | string>) => void;
};

type GetOptions = {
  params?: Record<string, string>;
} & RequestOptions;
export const getData = async <T>(
  url: string,
  options?: GetOptions,
): Promise<T> => {
  const { params, onError, onSucceed } = options ?? {};
  return new Promise((resolve, reject) => {
    service
      .get<APIRes.Response<T>>(url, { params })
      .then((res) => {
        if (res.status === 200) {
          onSucceed?.();
          if (res.data.status === 'success') {
            resolve(res.data.data);
          } else {
            resolve(res.data as unknown as T);
          }
        } else {
          console.error(
            'Get 被 resolve 但响应不为 200 或 status 不为 success：',
            res,
          );
          reject(res);
        }
      })
      .catch((e) => {
        const err = e as AxiosError<APIRes.Error>;
        onError?.(err);
        reject(err);
      });
  });
};

type PostOptions = {
  data?: Record<string, any>;
} & RequestOptions;
export const postData = async <T>(
  url: string,
  options?: PostOptions,
): Promise<T> => {
  const { data, onSucceed, onError } = options ?? {};
  return new Promise((resolve, reject) => {
    service
      .post<APIRes.Response<T>>(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        if ([200, 201].includes(res.status) && res.data.status === 'success') {
          onSucceed?.();
          resolve(res.data.data);
        } else {
          console.error(
            'Post 被 resolve 但响应不为 200|201 或 status 不为 success：',
            res,
          );
          reject(res);
        }
      })
      .catch((e) => {
        const err = e as AxiosError<APIRes.Error>;
        console.error('Sub-Store >>> Post 请求失败，原始错误：', err);
        onError?.(err);
        reject(err);
      });
  });
};

type PutOptions = {
  data?: Record<string, string>;
} & RequestOptions;
export const putData = async <T>(
  url: string,
  options?: PutOptions,
): Promise<T> => {
  const { data, onSucceed, onError } = options ?? {};
  return new Promise((resolve, reject) => {
    service
      .put<APIRes.Response<T>>(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        if (res.status === 200 && res.data.status === 'success') {
          onSucceed?.();
          resolve(res.data.data);
        } else {
          console.error(
            'Put 被 resolve 但响应不为 200 或 status 不为 success：',
            res,
          );
          reject(res);
        }
      })
      .catch((e) => {
        const err = e as AxiosError<APIRes.Error>;
        console.error('Sub-Store >>> Put 请求失败，原始错误：', err);
        onError?.(err);
        reject(err);
      });
  });
};

type PatchOptions = {
  data?: Record<string, any>;
} & RequestOptions;
export const patchData = async <T>(
  url: string,
  options?: PatchOptions,
): Promise<T> => {
  const { data, onSucceed, onError } = options ?? {};
  return new Promise((resolve, reject) => {
    service
      .patch<APIRes.Response<T>>(url, data, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        if (res.status === 200 && res.data.status === 'success') {
          onSucceed?.();
          resolve(res.data.data);
        } else {
          console.error(
            'Patch 被 resolve 但响应不为 200 或 status 不为 success：',
            res,
          );
          reject(res);
        }
      })
      .catch((e) => {
        const err = e as AxiosError<APIRes.Error>;
        console.error('Sub-Store >>> Patch 请求失败，原始错误：', err);
        onError?.(err);
        reject(err);
      });
  });
};

type DeleteOptions = {
  params?: Record<string, string>;
} & RequestOptions;
export const deleteData = async <T>(
  url: string,
  options?: DeleteOptions,
): Promise<T> => {
  const { params, onSucceed, onError } = options ?? {};
  return new Promise((resolve, reject) => {
    service
      .delete<APIRes.Response<T>>(url, { params })
      .then((res) => {
        if (res.status === 200 && res.data.status === 'success') {
          onSucceed?.();
          resolve(res.data.data);
        } else {
          console.error(
            'Delete 被 resolve 但响应不为 200 或 status 不为 success：',
            res,
          );
          reject(res);
        }
      })
      .catch((e) => {
        const err = e as AxiosError<APIRes.Error>;
        console.error('Sub-Store >>> Delete 请求失败，原始错误：', err);
        onError?.(err);
        reject(err);
      });
  });
};
