<template>
  <n-layout-header :class="props.className" bordered>
    <div class="h-full flex items-center justify-between">
      <div class="flex items-center gap-x-[12px] text-[16px] font-bold">
        <div class="aspect-1 w-[28px]">
          <img
            :src="appLogo.rounded.value"
            alt="logo"
            class="h-full w-full object-cover"
          >
        </div>
        <p>Sub Store App</p>
      </div>

      <div class="text-[14px]">
        <n-popselect
          :value="colorMode"
          :options="colorModeOptions"
          trigger="click"
          @update:value="changeColorMode"
        >
          <n-button quaternary circle class="cursor-pointer text-[20px]">
            <template #icon>
              <i
                v-show="c === 'light'"
                class="i-solar-sun-bold-duotone block"
              />
              <i v-show="c === 'dark'" class="i-solar-moon-stars-bold block" />
            </template>
          </n-button>
        </n-popselect>
      </div>
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useColorMode } from '@vueuse/core';

import { useLogo } from '../../hooks/useLogo.ts';

const props = defineProps<{
  className?: string
}>();

const { appLogo } = useLogo();

const c = useColorMode();
const { store: colorMode } = useColorMode();
const colorModeOptions = [
  {
    label: 'Light',
    value: 'light',
  },
  {
    label: 'Dark',
    value: 'dark',
  },
  {
    label: 'Auto',
    value: 'auto',
  },
] as const;
const changeColorMode = (value: (typeof colorModeOptions)[number]['value']) => {
  colorMode.value = value;
};
</script>
