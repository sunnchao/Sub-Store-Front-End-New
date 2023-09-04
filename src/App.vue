<template>
  <template v-if="width < 768">
    <router-view />
  </template>

  <template v-else>
    <NaiveConfig>
      <router-view />
    </NaiveConfig>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import NaiveConfig from './layouts/pc/NaiveConfig.vue';

const width = ref(window.innerWidth);
</script>
