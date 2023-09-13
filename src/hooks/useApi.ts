import type { AxiosError } from 'axios';

import { deleteData, getData, postData } from '../utils/service';
import { useAppMessage } from './useAppMessage.tsx';

export const useApi = () => {
  const { showAppMessage } = useAppMessage();

  const parseError = (err: AxiosError<APIRes.Error | string>) => {
    let content = err.message;
    const errData = err.response?.data;
    if (errData) {
      content = typeof errData === 'string' ? errData : errData.error.message;
    }
    return {
      error: err,
      message: content,
    };
  };

  const onError = (err: AxiosError<APIRes.Error | string>) => {
    showAppMessage({
      type: 'error',
      message: parseError(err).message,
    });
  };

  const subApi = {
    // 单条订阅
    getSubs: () => getData<Subscription.Subs>('/api/subs', { onError }),
    createSub: (data: Subscription.Sub) =>
      postData('/api/subs', {
        onError,
        data,
      }),
    deleteSub: (name: string) => deleteData(`/api/sub/${name}`, { onError }),

    // 组合订阅
    getCollections: () =>
      getData<Subscription.Collections>('/api/collections', { onError }),
    createCollection: (data: Subscription.Collection) =>
      postData('/api/collections', {
        onError,
        data,
      }),
    deleteCollection: (name: string) =>
      deleteData(`/api/collection/${name}`, { onError }),

    // 流量
    getFlow: (name: string) =>
      getData<Subscription.Flow>(`/api/sub/flow/${name}`, { onError }),
  };

  const settingApi = {
    getSetting: () => getData<Settings.Response>('/api/settings', { onError }),
  };

  const utilsApi = {
    getEnv: () => getData<Utils.Env>('/api/utils/env', { onError }),
    refreshData: () => getData('/api/utils/refresh', { onError }),
  };

  return {
    subApi,
    settingApi,
    utilsApi,
    parseError,
  };
};
