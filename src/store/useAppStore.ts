import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: (): Store.AppState => ({
    xxx: '',
  }),
  actions: {
    reset() {
      this.xxx = '';
    },
  },
});
