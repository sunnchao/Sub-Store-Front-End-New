import { defineStore } from 'pinia';

import { useLogo } from '../hooks/useLogo.ts';

const initialState = (): Store.AppState => ({
  env: null,
});

export const useAppStore = defineStore('app', {
  state: initialState,
  actions: {
    setEnv(e: Utils.Env) {
      const { getLogoByBackend } = useLogo();
      this.env = {
        ...e,
        logo: getLogoByBackend(e.backend),
      };
    },
    reset() {
      this.$reset();
    },
  },
});
