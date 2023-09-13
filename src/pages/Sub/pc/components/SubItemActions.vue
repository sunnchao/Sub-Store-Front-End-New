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
          <n-button strong type="primary" quaternary @click="copyLink(props)">
            <template #icon>
              <i class="i-solar-plain-bold text-[16px] opacity-72" />
            </template>
            通用链接
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button
            strong
            type="primary"
            quaternary
            @click="openPreview?.(props)"
          >
            <template #icon>
              <i class="i-solar-widget-6-bold-duotone text-[18px] opacity-80" />
            </template>
            专用链接
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="primary" quaternary @click="compareItem">
            <template #icon>
              <i
                class="i-solar-documents-minimalistic-bold-duotone text-[18px] opacity-80"
              />
            </template>
            对比结果
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="primary" quaternary @click="editItem">
            <template #icon>
              <i class="i-solar-pen-2-bold-duotone text-[18px] opacity-72" />
            </template>
            编辑订阅
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="primary" quaternary @click="duplicateItem">
            <template #icon>
              <i class="i-solar-copy-bold-duotone text-[18px] opacity-72" />
            </template>
            创建副本
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="error" quaternary @click="deleteItem">
            <template #icon>
              <i
                class="i-solar-trash-bin-trash-bold-duotone text-[18px] opacity-80"
              />
            </template>
            删除订阅
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
import { computed, inject } from 'vue';
import { useRouter } from 'vue-router';

import { useApi } from '../../../../hooks/useApi.ts';
import { useAppMessage } from '../../../../hooks/useAppMessage.tsx';
import { useCopySubsLink } from '../../../../hooks/useCopySubsLink.ts';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';

const props = defineProps<{
  isVisible: boolean
  type: Components.SubType
  name: string
}>();

const store = useSubscriptionStore();
const { setSubs, setCollections } = store;
const { subs, collections } = storeToRefs(store);
const item = computed(() => {
  return props.type === 'sub'
    ? subs.value.find(sub => sub.name === props.name)
    : collections.value.find(collection => collection.name === props.name);
});
const displayName = computed(
  () => item.value?.displayName || item.value?.name || '未知',
);

const { copyLink } = useCopySubsLink();
const { subApi } = useApi();
const { showAppMessage } = useAppMessage();

const refreshData = async (message: MessageReactive) => {
  message.type = 'loading';
  message.content = '正在刷新数据...';

  if (props.type === 'sub') {
    const subs = await subApi.getSubs();
    setSubs(subs);
  } else if (props.type === 'collection') {
    const collections = await subApi.getCollections();
    setCollections(collections);
  }
};

const router = useRouter();
const editItem = () => {
  router.push(`/edit/${props.type}/${props.name}`);
};

const compareItem = () => {
  router.push(`/compare/${props.type}/${props.name}`);
};

const duplicateItem = async () => {
  const dName = displayName.value;

  const msg = showAppMessage({
    type: 'loading',
    message: `正在创建订阅【${dName}】的副本...`,
  })!;

  const randomStr = Math.random().toString(36).substring(2, 6);

  if (props.type === 'sub') {
    const data = { ...item.value } as Subscription.Sub;
    data.name = `${data.name}-copy${randomStr}`;
    await subApi.createSub(data).catch(() => msg.destroy());
  } else if (props.type === 'collection') {
    const data = { ...item.value } as Subscription.Collection;
    data.name = `${data.name}-copy${randomStr}`;
    await subApi.createCollection(data).catch(() => msg.destroy());
  }

  await refreshData(msg);
  msg.content = `创建订阅【${dName}】的副本成功！`;
  msg.type = 'success';
  setTimeout(() => {
    msg.destroy();
  }, 1500);
};

const dialog = useDialog();

const deleteItem = () => {
  const dName = displayName.value;

  dialog.error({
    title: '删除订阅',
    content: `确定要删除订阅【${dName}】吗？`,
    positiveText: '确认删除',
    negativeText: '取消',
    onPositiveClick: async () => {
      const msg = showAppMessage({
        type: 'loading',
        message: `正在删除订阅【${dName}】...`,
      })!;

      if (props.type === 'sub') {
        await subApi.deleteSub(props.name).catch(() => msg.destroy());
      } else if (props.type === 'collection') {
        await subApi.deleteCollection(props.name).catch(() => msg.destroy());
      }

      await refreshData(msg);
      msg.content = `删除订阅【${dName}】成功！`;
      msg.type = 'success';
      setTimeout(() => {
        msg.destroy();
      }, 1500);
    },
  });
};

const openPreview = inject<Components.PreviewMultiplePlatform>(
  'previewMultiplePlatform',
);
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
