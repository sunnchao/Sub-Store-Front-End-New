<template>
  <div v-if="props.info">
    <n-descriptions
      label-placement="top"
      title="解析结果"
      :column="4"
      bordered
      :label-style="{ fontWeight: 'bold' }"
    >
      <n-descriptions-item label="模块名">
        {{ props.info.title }}
      </n-descriptions-item>
      <n-descriptions-item label="兼容后端" :span="3">
        <div class="flex items-center gap-x-[8px]">
          <AutoImage v-for="src in logoSrcList" :key="src" :src="src" />

          <n-tag v-if="isCompatible" type="success">
            模块与当前后端兼容
            <template #icon>
              <i class="i-solar-check-square-bold block" />
            </template>
          </n-tag>
          <n-tag v-else type="error">
            模块与当前后端不兼容
            <template #icon>
              <i class="i-solar-close-square-bold block" />
            </template>
          </n-tag>
        </div>
      </n-descriptions-item>

      <n-descriptions-item label="作者" :span="2">
        {{ props.info.author || "-" }}
      </n-descriptions-item>
      <n-descriptions-item label="版本">
        {{ props.info.version || "-" }}
      </n-descriptions-item>
      <n-descriptions-item label="更新时间">
        {{ props.info.updateTime || "-" }}
      </n-descriptions-item>

      <n-descriptions-item label="模块描述" :span="4">
        {{ props.info.description || "-" }}
      </n-descriptions-item>

      <n-descriptions-item label="模块详情页" :span="4">
        <span v-if="!props.info.pageContent">-</span>
        <template v-else>
          <span
            v-for="line in props.info.pageContent.split('\n')"
            :key="line"
            class="block leading-loose"
          >
            {{ line }}
          </span>
        </template>
      </n-descriptions-item>
    </n-descriptions>

    <div class="mt-[16px] w-full flex justify-end">
      <n-button
        type="primary"
        size="large"
        :disabled="!isCompatible"
        @click="emits('submit')"
      >
        {{ props.isEdit ? "更新模块" : "添加模块" }}
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useLogo } from '../../../hooks/useLogo.ts';
import { useAppStore } from '../../../store/useAppStore.ts';

const props = defineProps<{
  info?: Modules.PostInfo
  isEdit?: boolean
}>();
const emits = defineEmits<{
  (event: 'submit'): void
}>();

const { getLogoByBackend } = useLogo();
const { env } = storeToRefs(useAppStore());
const isCompatible = computed(() => {
  if (!env.value) return false;
  return props.info?.scope.includes(env.value.backend);
});
const logoSrcList = computed(() => {
  if (!props.info) return [];
  return [
    ...new Set(
      props.info.scope
        .map(name => getLogoByBackend(name, false))
        .filter(Boolean),
    ),
  ];
});
</script>
