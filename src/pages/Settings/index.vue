<template>
  <PCSettings />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen';
import PCSettings from './pc/PCSettings.vue';

const { isPc } = useScreen();
</script>
