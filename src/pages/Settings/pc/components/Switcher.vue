<template>
  <div
    class="mt-[20px] max-w-[320px] flex items-center justify-between text-text-tertiary-light dark:text-text-tertiary-dark"
  >
    <p>{{ props.content }}</p>
    <n-switch :value="props.value" @change="_onChange" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: boolean
  onChange?: (v: boolean) => void
  content: string
}>();

const _onChange = (v: boolean) => {
  props.onChange?.(v);
};
</script>
