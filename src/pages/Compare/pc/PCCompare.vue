<template>
  <div>
    <LoadingAndError :loading="props.loading" :error="props.error" />
    <ComparePage v-if="props.compareData" :data="props.compareData" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  error: string
  compareData?: Compare.Data
}>();
</script>
