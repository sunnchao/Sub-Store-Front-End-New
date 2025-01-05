<template>
  <PCModules :loading="loading" />
</template>

<script setup lang="ts">
import { useApi } from '../../hooks/useApi.ts';
import { useRequest } from '../../hooks/useRequest.ts';
import { useScreen } from '../../hooks/useScreen';
import { useModuleStore } from '../../store/useModuleStore.ts';

const { isPc } = useScreen();

const store = useModuleStore();

const { moduleApi } = useApi();
const { setModules } = store;

const { loading } = useRequest(moduleApi.getModules, {
  onSucceed: d => setModules(d),
});
</script>
