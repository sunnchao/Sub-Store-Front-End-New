<template>
  <div>PC Modules</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { CONSTANTS } from '../../../constants';
import { useModuleStore } from '../../../store/useModuleStore.ts';
import { moduleParser } from '../../../utils/moduleParser.ts';

const store = useModuleStore();

const { modules } = storeToRefs(store);
const { setModules } = store;

console.log(modules.value);
console.log(setModules);

const text = CONSTANTS.testText;
const json = moduleParser(text);
console.log(json);
</script>
