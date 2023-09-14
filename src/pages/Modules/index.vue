<template>
  <PCModules v-if="isPc" :loading="loading" />
  <H5Modules v-else />
</template>

<script setup lang="ts">
import { useApi } from '../../hooks/useApi.ts';
import { useRequest } from '../../hooks/useRequest.ts';
import { useScreen } from '../../hooks/useScreen';
import { useModuleStore } from '../../store/useModuleStore.ts';
import H5Modules from './h5/H5Modules.vue';
import PCModules from './pc/PCModules.vue';

const { isPc } = useScreen();

const store = useModuleStore();

const { moduleApi } = useApi();
const { setModules } = store;

const { loading } = useRequest(moduleApi.getModules, {
  onSucceed: d => setModules(d),
});
</script>
