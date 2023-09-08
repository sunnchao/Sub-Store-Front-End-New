import type { AxiosError } from 'axios';
import { onBeforeUnmount, ref, watchEffect } from 'vue';

import { useBackendApiUrl } from './useBackendApiUrl';

type Options<T> = {
  onSucceed?: (data: T) => void
};

export const useResponsiveRequestData = <T>(
  reqMethod: () => Promise<T>,
  options?: Options<T>,
) => {
  const { onSucceed } = options || {};
  const { currentApi } = useBackendApiUrl();

  const data = ref<T>();
  const error = ref<AxiosError<APIRes.Error | string>>();
  const loading = ref(false);

  const request = async () => {
    loading.value = true;

    try {
      const res = await reqMethod();
      data.value = res;
      error.value = undefined;
      onSucceed && onSucceed(res);
    } catch (err) {
      error.value = err as AxiosError<APIRes.Error | string>;
    } finally {
      loading.value = false;
    }
  };

  const stop = watchEffect(() => {
    currentApi.value && request();
  });
  onBeforeUnmount(() => {
    stop();
  });

  return {
    data,
    error,
    loading,
  };
};
