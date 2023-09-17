<template>
  <div>
    <LoadingAndError :loading="loading" :error="error" />

    <template v-if="props.data">
      <n-descriptions label-placement="top" :column="3" title="模块信息">
        <n-descriptions-item label="模块名">
          {{ props.data.title }}
        </n-descriptions-item>
        <n-descriptions-item label="模块作者">
          {{ props.data.author || "-" }}
        </n-descriptions-item>
        <n-descriptions-item label="适用范围">
          <div class="flex gap-x-[8px]">
            <AutoImage v-for="src in logoSrcList" :key="src" :src="src" />
          </div>
        </n-descriptions-item>
        <n-descriptions-item label="模块版本">
          {{ props.data.version || "-" }}
        </n-descriptions-item>
        <n-descriptions-item label="更新时间">
          {{ props.data.updateTime || "-" }}
        </n-descriptions-item>
        <n-descriptions-item label="模块源地址">
          <a
            v-if="props.data.url"
            :href="props.data.url"
            target="_blank"
            class="text-primary-light dark:text-primary-dark hover:opacity-72"
          >
            源地址
          </a>
          <span v-else>本地模块无源地址</span>
        </n-descriptions-item>
        <n-descriptions-item label="模块描述" :span="3">
          {{ props.data.description }}
        </n-descriptions-item>
      </n-descriptions>

      <h2 class="mb-[12px] mt-[36px] pc-secondary-title">
        模块介绍
      </h2>

      <p
        v-for="text in props.data.pageContent?.split('\n')"
        :key="text"
        class="leading-loose"
      >
        {{ text }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import LoadingAndError from '../../../../components/pc/LoadingAndError.vue';
import { useLogo } from '../../../../hooks/useLogo.ts';

const props = defineProps<{
  loading: boolean
  data?: Modules.BackendModule
  error: string
}>();

const { getLogoByBackend } = useLogo();
const logoSrcList = computed(() => {
  if (!props.data?.scope) return [];
  return [
    ...new Set(
      props.data.scope
        .map(name => getLogoByBackend(name, false))
        .filter(Boolean),
    ),
  ];
});
</script>
