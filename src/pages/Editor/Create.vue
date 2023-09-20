<template>
  <PCEditor v-if="isPc" :type="type" />
  <H5Editor v-else />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useScreen } from '../../hooks/useScreen.ts';
import H5Editor from './h5/H5Editor.vue';
import PCEditor from './pc/PCEditor.vue';

const { isPc } = useScreen();

const route = useRoute();
const type = route.params.type as Components.SubType;
</script>
