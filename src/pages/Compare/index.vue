<template>
  <PCCompare v-if="isPc" />
  <H5Compare v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen.ts';
import H5Compare from './h5/H5Compare.vue';
import PCCompare from './pc/PCCompare.vue';

const { isPc } = useScreen();
</script>
