import { useStorage } from '@vueuse/core';
import { computed } from 'vue';

import { CONSTANTS } from '../constants';
import { service } from '../utils/service';

export const useBackendApiUrl = () => {
  const backendApi = useStorage<Settings.BackendApiUrl>(
    CONSTANTS.BACKEND_API.LS_KEY,
    CONSTANTS.BACKEND_API.INITIAL,
  );

  const getApi = (name: string) => {
    return backendApi.value.apis.find(api => api.name === name);
  };

  const currentApi = computed(
    () =>
      backendApi.value.apis.find(
        api => api.name === backendApi.value.current,
      )!,
  );
  const backendApis = computed(() => backendApi.value.apis);

  const addApi = ({ name, url }: { name: string; url: string }) => {
    if (getApi(name)) return;
    backendApi.value.apis.push({
      name,
      url,
    });
  };
  const removeApi = (name: string) => {
    if (!getApi(name)) return;
    const index = backendApi.value.apis.findIndex(api => api.name === name);
    backendApi.value.apis.splice(index, 1);
  };
  const setCurrentApi = (name: string) => {
    if (!getApi(name)) return;
    backendApi.value.current = name;
    service.defaults.baseURL = getApi(name)?.url ?? 'https://sub.store';
  };

  return {
    currentApi,
    backendApis,
    getApi,
    addApi,
    removeApi,
    setCurrentApi,
  };
};
