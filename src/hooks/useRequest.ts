import type { AxiosError } from 'axios';

import { getData } from '../utils/service';
import { useScreen } from './useScreen';

export const useRequest = () => {
  const { isPc } = useScreen();

  const onerror = (err: AxiosError<APIRes.Error | string>) => {
    let content = err.message;
    const errData = err.response?.data;
    errData
      && (content = typeof errData === 'string' ? errData : errData.error.message);

    if (isPc.value) {
      window.$pcMessage.error(content);
    } else {
      console.log('mobile err: ', content);
    }
  };

  const subApi = {
    getFlow: (name: string) =>
      getData<Subscription.Flow>(`/api/sub/flow/${name}`, { onError: onerror }),
  };

  const settingApi = {
    getSetting: () =>
      getData<Settings.Response>('/api/settings', { onError: onerror }),
  };

  const utilsApi = {
    getEnv: () => getData<Utils.Env>('/api/utils/env', { onError: onerror }),
  };

  return {
    subApi,
    settingApi,
    utilsApi,
  };
};
