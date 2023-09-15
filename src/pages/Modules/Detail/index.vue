<template>
  <PCEditModule
    v-if="isPc"
    :loading="loading"
    :data="moduleData"
    :error="error"
    @update-module="updateModule"
  />
  <H5EditModModule v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useApi } from '../../../hooks/useApi.ts';
import { useAppMessage } from '../../../hooks/useAppMessage.tsx';
import { useScreen } from '../../../hooks/useScreen';
import { useModuleStore } from '../../../store/useModuleStore.ts';
import H5EditModModule from './h5/H5EditModule.vue';
import PCEditModule from './pc/PCEditModule.vue';

const { isPc } = useScreen();

const name = useRoute().params.name as string;
const store = useModuleStore();
const { isInit, modules } = storeToRefs(store);
const { moduleApi } = useApi();

const error = ref('');
const loading = ref(true);
const moduleData = ref<
(Modules.BackendModule & { content: string }) | undefined
  >(undefined);

onMounted(async () => {
  if (!isInit.value) {
    const modules = await moduleApi.getModules();
    store.setModules(modules);
  }

  const module = modules.value.find(m => m.name === name);
  if (!module) {
    error.value = '模块不存在';
  } else {
    moduleApi
      .getModuleContent(module.name)
      .then((content) => {
        moduleData.value = { ...module, content };
      })
      .catch(() => {
        error.value = '获取模块内容失败';
      });
  }

  loading.value = false;
});

const { showAppMessage } = useAppMessage();
const router = useRouter();
const updateModule = async (data: Modules.PostInfo) => {
  const loading = showAppMessage({
    type: 'loading',
    message: '正在更新模块...',
  })!;

  await moduleApi.updateModule(name, data).catch(() => loading.destroy());

  router.push('/modules');
  loading.type = 'success';
  loading.content = '更新模块成功！';
  setTimeout(() => loading.destroy(), 1500);
};
</script>
