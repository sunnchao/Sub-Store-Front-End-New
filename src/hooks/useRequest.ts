import type { AxiosError } from 'axios';

import { getData } from '../utils/service';
import { useMessage } from './useMessage.tsx';

export const useRequest = () => {
  const { showMessage } = useMessage();

  const onError = (err: AxiosError<APIRes.Error | string>) => {
    let content = err.message;
    const errData = err.response?.data;
    errData
      && (content = typeof errData === 'string' ? errData : errData.error.message);

    showMessage({
      type: 'error',
      message: content,
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
  };

  return {
    subApi,
    settingApi,
    utilsApi,
  };
};
