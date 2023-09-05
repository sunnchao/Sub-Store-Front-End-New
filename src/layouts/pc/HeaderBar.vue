<template>
  <n-layout-header :class="props.className" bordered>
    <div class="h-full flex items-center justify-between">
      <div class="flex items-center gap-x-[12px] text-[16px] font-bold">
        <div class="aspect-1 w-[28px]">
          <img :src="logo" alt="logo" class="h-full w-full object-cover">
        </div>
        <p>Sub Store App</p>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useOsTheme } from 'naive-ui';
import { computed } from 'vue';

import { useLogo } from '../../hooks/useLogo.ts';

const props = defineProps<{
  className?: string
}>();

const osThemeRef = useOsTheme();

const {
  logo: { darkRounded, lightRounded },
} = useLogo();
const logo = computed(() =>
  osThemeRef.value === 'dark' ? darkRounded : lightRounded,
);
</script>
