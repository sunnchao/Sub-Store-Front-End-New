import { defineStore } from 'pinia';

const initialState = (): Store.ModuleState => ({
  isInit: false,
  modules: [],
});

export const useModuleStore = defineStore('module', {
  state: initialState,
  actions: {
    setModules(modules: Modules.BackendModules) {
      this.modules = modules;
      this.isInit = true;
    },
    reset() {
      this.$reset();
    },
  },
});
