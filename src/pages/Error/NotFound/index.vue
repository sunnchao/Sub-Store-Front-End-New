<template>
  <PCNotFound v-if="isPc" />
  <H5NotFound v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../../hooks/useScreen';
import H5NotFound from './h5/H5NotFound.vue';
import PCNotFound from './pc/PCNotFound.vue';

const { isPc } = useScreen();
</script>
