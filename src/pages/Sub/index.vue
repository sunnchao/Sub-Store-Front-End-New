<template>
  <PCSub v-if="isPc" />
  <H5Sub v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen';
import H5Sub from './h5/H5Sub.vue';
import PCSub from './pc/PCSub.vue';

const { isPc } = useScreen();
</script>
