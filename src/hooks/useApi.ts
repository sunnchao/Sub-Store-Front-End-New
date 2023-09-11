import type { AxiosError } from 'axios';

import { getData } from '../utils/service';
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
    getSubs: () => getData<Subscription.Subs>('/api/subs', { onError }),
    getCollections: () =>
      getData<Subscription.Collections>('/api/collections', { onError }),
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
