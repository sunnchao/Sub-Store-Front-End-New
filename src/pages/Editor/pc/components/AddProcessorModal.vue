<template>
  <n-modal
    :show="props.isVisible"
    preset="card"
    :style="{ width: '600px' }"
    title="添加一个处理器"
    size="huge"
    :bordered="false"
    :segmented="{ content: 'soft', footer: 'soft' }"
  >
    <n-list clickable hoverable>
      <n-list-item
        v-for="module in modules"
        :key="module.name"
        @click="emits('add', module.name)"
      >
        <n-thing :title="module.displayName">
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              {{ module.title }}
              <n-tag :bordered="false" type="info" size="small">
                {{ module.version }}
              </n-tag>
              <n-divider vertical />
              {{ module.author }}
            </n-space>
          </template>
          <n-ellipsis :line-clamp="2">
            {{ module.description }}
          </n-ellipsis>
        </n-thing>
      </n-list-item>
      <n-list />
    </n-list>
  </n-modal>
</template>

<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean;
  modules: Modules.BackendModules;
}>();
const emits = defineEmits<{
  (e: 'add', name: string): void;
}>();

// const addProcessor = (name: string) => {
//   console.log('add Processor ', name);
//   emits('add', name);
// };
</script>
