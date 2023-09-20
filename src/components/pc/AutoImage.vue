<template>
  <div
    class="aspect-1"
    :style="{
      ...(props.width && { width: props.width }),
      ...(props.height && { height: props.height }),
      ...(!props.width && !props.height && { width: '36px' }),
    }"
  >
    <img
      :src="
        disableFallback
          ? props.src
          : props.src || props.defaultSrc || appLogo.shape.value
      "
      alt="auto image"
      class="h-full w-full object-contain"
      :class="
        localSettings.isOriginalIcon && !props.alwaysBlackWhite
          ? ''
          : 'opacity-72 filter-brightness-0 dark:filter-brightness-100 dark:filter-saturate-0'
      "
    >
  </div>
</template>

<script setup lang="ts">
import { useLocalSettings } from '../../hooks/useLocalSettings.ts';
import { useLogo } from '../../hooks/useLogo.ts';

const props = defineProps<{
  width?: string;
  height?: string;
  src?: string;
  defaultSrc?: string;
  alwaysBlackWhite?: boolean;
  disableFallback?: boolean;
}>();

const { appLogo } = useLogo();
const { localSettings } = useLocalSettings();
</script>
