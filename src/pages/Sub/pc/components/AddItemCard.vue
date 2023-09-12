<template>
  <n-card
    :bordered="false"
    class="h-full cursor-pointer border-1 border-[#0006] border-dashed text-text-tertiary-light opacity-64 dark:border-[#fff6] hover:border-primary-light dark:text-text-tertiary-dark hover:text-primary-light hover:dark:border-primary-dark hover:dark:text-primary-dark"
    @click="add"
  >
    <div
      class="h-full w-full flex flex-col items-center justify-center gap-y-[8px]"
    >
      <i class="i-carbon-add block text-[44px]" />
      <p>{{ text }}</p>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  itemType: 'sub' | 'collection'
}>();

const text = computed(() => {
  return `创建${props.itemType === 'sub' ? '订阅' : '组合订阅'}`;
});

const add = () => {
  console.log('add');
};
</script>
