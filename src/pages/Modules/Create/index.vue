<template>
  <PCCreateModule v-if="isPc" />
  <H5CreateModule v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../../hooks/useScreen';
import H5CreateModule from './h5/H5CreateModule.vue';
import PCCreateModule from './pc/PCCreateModule.vue';

const { isPc } = useScreen();
</script>
