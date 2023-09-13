<template>
  <div>
    <n-spin v-if="props.loading" description="loading" />

    <div v-else-if="!props.loading && props.error">
      {{ props.error }}
    </div>

    <div v-else>
      {{ props.compareData }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  error: string | null
  compareData: any | null
}>();
</script>
