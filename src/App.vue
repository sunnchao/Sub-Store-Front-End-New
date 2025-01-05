<template>
  <n-config-provider :theme="theme" class="h-full" :hljs="hljs">
    <n-message-provider>
      <n-dialog-provider>
        <NaiveConfig />
      </n-dialog-provider>
    </n-message-provider>
    <n-global-style />
  </n-config-provider>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import { darkTheme } from 'naive-ui';
import { computed } from 'vue';

import { useScreen } from './hooks/useScreen';
import NaiveConfig from './layouts/pc/NaiveConfig.vue';

hljs.registerLanguage('javascript', javascript);
const { isPc } = useScreen();

const c = useColorMode();
const theme = computed(() => (c.value === 'dark' ? darkTheme : null));
</script>
