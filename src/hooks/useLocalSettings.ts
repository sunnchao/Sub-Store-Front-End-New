import { useStorage } from '@vueuse/core';

import { CONSTANTS } from '../constants';

export const useLocalSettings = () => {
  const localSettings = useStorage<Settings.Local>(
    CONSTANTS.LOCAL_SETTINGS.LS_KEY,
    CONSTANTS.LOCAL_SETTINGS.INITIAL,
  );

  return {
    localSettings,
  };
};
