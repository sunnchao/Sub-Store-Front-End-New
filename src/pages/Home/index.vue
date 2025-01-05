<template>
  <PCHome />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen';
import PCHome from './pc/PCHome.vue';

const { isPc } = useScreen();
</script>
