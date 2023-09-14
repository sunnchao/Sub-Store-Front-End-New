<template>
  <n-grid :x-gap="12" :y-gap="12" cols="1 600:2 900:3 1200:4 1500:5 1800:6">
    <n-grid-item v-for="module in modules" :key="module.name">
      <ModuleItem :module="module" />
    </n-grid-item>

    <n-grid-item>
      <AddModuleCard />
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useModuleStore } from '../../../../store/useModuleStore.ts';
import AddModuleCard from './AddModuleCard.vue';
import ModuleItem from './ModuleItem.vue';

const store = useModuleStore();
const { modules } = storeToRefs(store);
</script>
