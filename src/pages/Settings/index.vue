<template>
  <PCSettings v-if="isPc" />
  <H5Settings v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen';
import H5Settings from './h5/H5Settings.vue';
import PCSettings from './pc/PCSettings.vue';

const { isPc } = useScreen();
</script>
