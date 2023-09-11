<template>
  <template v-if="isPc">
    <n-config-provider :theme="theme" class="h-full">
      <n-message-provider>
        <NaiveConfig />
      </n-message-provider>
      <n-global-style />
    </n-config-provider>
  </template>

  <template v-else>
    <router-view />
  </template>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { darkTheme } from 'naive-ui';
import { computed } from 'vue';

import { useScreen } from './hooks/useScreen';
import NaiveConfig from './layouts/pc/NaiveConfig.vue';

const { isPc } = useScreen();

const c = useColorMode();
const theme = computed(() => (c.value === 'dark' ? darkTheme : null));
</script>
