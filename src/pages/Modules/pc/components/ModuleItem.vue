<template>
  <n-card ref="card" embedded hoverable>
    <ModuleItemActions :name="props.module.name" :is-visible="isCardHovered" />

    <n-thing>
      <template #header>
        {{ props.module.displayName }}
      </template>
      <template #header-extra>
        <n-tag :type="!props.module.url ? 'warning' : 'success'">
          {{ !props.module.url ? "本地" : "远程" }}
        </n-tag>
      </template>

      <template #description>
        <p>
          <span>{{ props.module.title }}</span>
          <n-divider vertical />
          <span
            class="text-text-quaternary-light dark:text-text-quaternary-dark"
          >{{ props.module.version }}</span>
        </p>
      </template>

      <n-ellipsis :line-clamp="2" :tooltip="false" class="min-h-[48px]">
        {{ props.module.description }}
      </n-ellipsis>

      <template #footer>
        <p v-if="props.module.author">
          <span
            class="mr-[8px] leading-loose text-text-quaternary-light dark:text-text-quaternary-dark"
          >作者</span>
          {{ props.module.author }}
        </p>

        <p v-if="props.module.updateTime">
          <span
            class="mr-[8px] leading-loose text-text-quaternary-light dark:text-text-quaternary-dark"
          >更新时间</span>
          {{ props.module.updateTime }}
        </p>
      </template>
    </n-thing>
  </n-card>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { ref } from 'vue';

import ModuleItemActions from './ModuleItemActions.vue';

const props = defineProps<{
  module: Modules.BackendModule;
}>();

const card = ref<HTMLElement | null>(null);
const isCardHovered = useElementHover(card);
</script>
