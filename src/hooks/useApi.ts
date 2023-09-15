import type { AxiosError } from 'axios';

import { deleteData, getData, patchData, postData } from '../utils/service';
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
    updateSub: (name: string, data: Subscription.Sub) =>
      patchData(`/api/sub/${name}`, {
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
    updateCollection: (name: string, data: Subscription.Collection) =>
      patchData(`/api/collection/${name}`, {
        onError,
        data,
      }),
    deleteCollection: (name: string) =>
      deleteData(`/api/collection/${name}`, { onError }),

    // 流量
    getFlow: (name: string) =>
      getData<Subscription.Flow>(`/api/sub/flow/${name}`),

    // 对比
    compareSub: (data: Subscription.Sub) =>
      postData<Compare.Data>('/api/preview/sub', {
        onError,
        data,
      }),
    compareCollection: (data: Subscription.Collection) =>
      postData<Compare.Data>('/api/preview/collection', {
        onError,
        data,
      }),
  };

  const moduleApi = {
    getModules: () =>
      getData<Modules.BackendModules>('/api/modules', { onError }),
    createModule: (data: Modules.PostInfo) =>
      postData('/api/modules', {
        onError,
        data,
      }),
    updateModule: (name: string, data: Modules.PostInfo) =>
      patchData(`/api/module/${name}`, {
        onError,
        data,
      }),
    deleteModule: (name: string) =>
      deleteData(`/api/module/${name}`, { onError }),
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
    moduleApi,
    settingApi,
    utilsApi,
    parseError,
  };
};
