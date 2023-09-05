<template>
  <PCHome v-if="isPc" />
  <H5Home v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen';
import H5Home from './h5/H5Home.vue';
import PCHome from './pc/PCHome.vue';

const { isPc } = useScreen();
</script>
