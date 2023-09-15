<template>
  <PCModulePage v-if="isPc" :loading="loading" :data="data" :error="error" />
  <H5ModulePage v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useApi } from '../../../hooks/useApi.ts';
import { useScreen } from '../../../hooks/useScreen';
import { useModuleStore } from '../../../store/useModuleStore.ts';
import H5ModulePage from './h5/H5ModulePage.vue';
import PCModulePage from './pc/PCModulePage.vue';

const { isPc } = useScreen();

const name = useRoute().params.name as string;
const store = useModuleStore();
const { isInit, modules } = storeToRefs(store);
const { moduleApi } = useApi();

const loading = ref(true);
const error = ref('');
const data = ref<Modules.BackendModule | undefined>(undefined);

onMounted(async () => {
  if (!isInit.value) {
    const modules = await moduleApi.getModules();
    store.setModules(modules);
  }

  const module = modules.value.find(m => m.name === name);
  if (module) {
    if (module.pageContent) {
      data.value = module;
    } else {
      error.value = '模块未提供主页内容';
    }
  } else {
    error.value = '模块不存在';
  }

  loading.value = false;
});
</script>
