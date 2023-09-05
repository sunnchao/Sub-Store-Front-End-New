<template>
  <PCHome v-if="isPc" />
  <H5Home v-else />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useRequest } from '../../hooks/useRequest.ts';
import { useScreen } from '../../hooks/useScreen';
import H5Home from './h5/H5Home.vue';
import PCHome from './pc/PCHome.vue';

const { isPc } = useScreen();

const { subApi } = useRequest();
onMounted(async () => {
  const [aioRes, testRes] = await Promise.allSettled([
    subApi.getFlow('aioclinic'),
    subApi.getFlow('test'),
  ]);
  if (aioRes.status === 'fulfilled') {
    console.log('aioRes: ', aioRes.value);
  }
  if (testRes.status === 'fulfilled') {
    console.log('testRes: ', testRes.value);
  }
});
</script>
