<template>
  <div>
    <div
      v-if="props.loading || props.error"
      class="h-[440px] flex items-center justify-center"
    >
      <n-spin
        v-if="props.loading && !props.error"
        description="正在加载对比数据，请稍候..."
      />
      <div v-else-if="!props.loading && props.error">
        <n-empty :description="props.error" size="huge">
          <template #icon>
            <i class="i-solar-confounded-square-bold-duotone block" />
          </template>
        </n-empty>
      </div>
    </div>

    <ComparePage v-else-if="props.compareData" :data="props.compareData" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  loading: boolean
  error?: string
  compareData?: Compare.Data
}>();
</script>
