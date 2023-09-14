<template>
  <PCModules v-if="isPc" />
  <H5Modules v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen';
import H5Modules from './h5/H5Modules.vue';
import PCModules from './pc/PCModules.vue';

const { isPc } = useScreen();
</script>
