import { defineStore } from 'pinia';

import { useLogo } from '../hooks/useLogo.ts';

const initialState = (): Store.AppState => ({
  env: null,
});

export const useAppStore = defineStore('app', {
  state: initialState,
  actions: {
    setEnv(e: Utils.Env) {
      const { appLogo, toolLogo } = useLogo();
      let logo = '';
      switch (e.backend) {
        case 'Node':
          logo = toolLogo.node;
          break;
        case 'Surge':
          logo = toolLogo.surge;
          break;
        case 'QX':
          logo = toolLogo.quanx;
          break;
        case 'Loon':
          logo = toolLogo.loon;
          break;
        case 'Stash':
          logo = toolLogo.stash;
          break;
        case 'ShadowRocket':
          logo = toolLogo.shadowrocket;
          break;
        default:
          logo = appLogo.shape.value;
      }
      this.env = {
        ...e,
        logo,
      };
    },
    reset() {
      this.$reset();
    },
  },
});
