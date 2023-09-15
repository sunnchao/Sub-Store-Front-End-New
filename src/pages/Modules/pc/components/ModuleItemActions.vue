<template>
  <Transition name="opacity">
    <div
      v-if="props.isVisible"
      class="absolute left-0 top-0 z-100 h-full w-full flex items-center justify-center rounded-[4px] bg-[#fafafccc] px-[16px] backdrop-blur-[4px] dark:bg-[#18181ccc]"
    >
      <n-grid
        cols="1 224:2 340:3 456:4 572:5 688:6"
        responsive="self"
        :x-gap="8"
        :y-gap="8"
      >
        <n-grid-item class="flex justify-center">
          <n-button
            strong
            type="primary"
            quaternary
            @click="router.push(`/modulePage/${props.name}`)"
          >
            <template #icon>
              <i class="i-solar-plain-bold text-[16px] opacity-72" />
            </template>
            模块介绍
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button
            strong
            type="primary"
            quaternary
            @click="router.push(`/module/${props.name}`)"
          >
            <template #icon>
              <i class="i-solar-pen-2-bold-duotone text-[18px] opacity-80" />
            </template>
            编辑
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="error" quaternary @click="deleteItem">
            <template #icon>
              <i
                class="i-solar-trash-bin-trash-bold-duotone text-[18px] opacity-80"
              />
            </template>
            删除
          </n-button>
        </n-grid-item>
      </n-grid>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { MessageReactive } from 'naive-ui';
import { useDialog } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useApi } from '../../../../hooks/useApi.ts';
import { useAppMessage } from '../../../../hooks/useAppMessage.tsx';
import { useModuleStore } from '../../../../store/useModuleStore.ts';

const props = defineProps<{
  isVisible: boolean
  name: string
}>();

const store = useModuleStore();
const { modules } = storeToRefs(store);
const item = computed(() => modules.value.find(m => m.name === props.name));

const router = useRouter();
const { moduleApi } = useApi();
const { showAppMessage } = useAppMessage();

const refreshData = async (message: MessageReactive) => {
  message.type = 'loading';
  message.content = '正在刷新数据...';

  const modules = await moduleApi.getModules();
  store.setModules(modules);
};

const dialog = useDialog();
const deleteItem = () => {
  const dName = item.value?.displayName;

  dialog.error({
    title: '删除模块',
    content: `确定要删除模块【${dName}】吗？`,
    positiveText: '确认删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      const msg = showAppMessage({
        type: 'loading',
        message: `正在删除模块【${dName}】...`,
      })!;

      await moduleApi.deleteModule(props.name).catch(() => msg.destroy());

      await refreshData(msg);
      msg.content = `删除模块【${dName}】成功！`;
      msg.type = 'success';
      setTimeout(() => msg.destroy(), 1500);
    },
  });
};
</script>

<style scoped lang="scss">
.opacity-enter-active,
.opacity-leave-active {
  transition: all 0.3s;
}

.opacity-enter-from,
.opacity-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
