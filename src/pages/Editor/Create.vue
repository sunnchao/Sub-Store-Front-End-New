<template>
  <PCEditor v-if="isPc" />
  <H5Editor v-else />
</template>

<script setup lang="ts">
import { useScreen } from '../../hooks/useScreen.ts';
import H5Editor from './h5/H5Editor.vue';
import PCEditor from './pc/PCEditor.vue';

const { isPc } = useScreen();

console.log('创建订阅');
</script>
