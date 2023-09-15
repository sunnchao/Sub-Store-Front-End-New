<template>
  <div>
    <LoadingAndError :loading="loading" :error="error" />

    <template v-if="props.data">
      <n-descriptions label-placement="top" bordered :column="3">
        <n-descriptions-item label="模块名">
          {{ props.data.displayName }}
        </n-descriptions-item>
        <n-descriptions-item label="模块标题">
          {{ props.data.title }}
        </n-descriptions-item>
        <n-descriptions-item label="模块作者">
          {{ props.data.author }}
        </n-descriptions-item>
      </n-descriptions>
      <p v-for="text in props.data.pageContent?.split('\n')" :key="text">
        {{ text }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import LoadingAndError from '../../../../components/pc/LoadingAndError.vue';

const props = defineProps<{
  loading: boolean
  data?: Modules.BackendModule
  error: string
}>();
</script>
