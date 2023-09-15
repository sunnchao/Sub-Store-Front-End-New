<template>
  <div
    v-if="props.loading || props.error"
    class="min-h-[320px] flex items-center justify-center"
  >
    <n-spin v-if="props.loading" size="medium" />
    <n-empty
      v-else-if="!props.loading && props.error"
      :description="props.error"
      size="huge"
    >
      <template #icon>
        <i class="i-solar-confounded-square-bold-duotone block" />
      </template>
    </n-empty>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  error: string
}>();
</script>
