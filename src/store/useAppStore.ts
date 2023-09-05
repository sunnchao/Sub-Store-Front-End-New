import { defineStore } from 'pinia';

const initialState = (): Store.AppState => ({
  env: null,
});

export const useAppStore = defineStore('app', {
  state: initialState,
  actions: {
    setEnv(e: Utils.Env) {
      this.env = e;
    },
    reset() {
      this.$reset();
    },
  },
});
