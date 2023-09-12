<template>
  <n-button
    size="small"
    type="default"
    ghost
    :loading="loading"
    @click="refresh"
  >
    {{ loading ? "刷新中" : "刷新后端缓存" }}
  </n-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useApi } from '../../hooks/useApi.ts';
import { useAppMessage } from '../../hooks/useAppMessage.tsx';

const { showAppMessage } = useAppMessage();
const { utilsApi } = useApi();
const loading = ref(false);

const refresh = () => {
  loading.value = true;
  utilsApi
    .refreshData()
    .then(() => {
      showAppMessage({
        type: 'success',
        message: '刷新缓存成功！',
      });
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
