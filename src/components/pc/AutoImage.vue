<template>
  <div
    class="aspect-1"
    :class="
      props.width
        ? `w-[${props.width}]`
        : props.height
          ? `h-[${props.height}]`
          : 'w-[36px]'
    "
  >
    <img
      :src="props.src || props.defaultSrc || appLogo.shape.value"
      alt="auto image"
      class="h-full w-full object-contain"
      :class="
        localSettings.isOriginalIcon
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
  width?: string
  height?: string
  src?: string
  defaultSrc?: string
}>();

const { appLogo } = useLogo();
const { localSettings } = useLocalSettings();
</script>
