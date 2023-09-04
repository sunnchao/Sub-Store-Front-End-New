<template>
  <n-config-provider :theme="theme" class="h-full">
    <PCAppLayout>
      <router-view />
    </PCAppLayout>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, useOsTheme } from 'naive-ui';
import { computed } from 'vue';

import PCAppLayout from './AppLayout.vue';

const osThemeRef = useOsTheme();
const theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));
</script>
