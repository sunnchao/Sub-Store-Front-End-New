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
    </div>
  </n-layout-header>
</template>

<script setup lang="ts">
import { useLogo } from '../../hooks/useLogo.ts';

const props = defineProps<{
  className?: string
}>();

const { appLogo } = useLogo();
</script>
