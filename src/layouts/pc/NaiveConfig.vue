<template>
  <PCAppLayout>
    <router-view />
  </PCAppLayout>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui';
import { onMounted } from 'vue';

import PCAppLayout from './AppLayout.vue';

onMounted(() => {
  window.$pcMessage = useMessage();
});
</script>
