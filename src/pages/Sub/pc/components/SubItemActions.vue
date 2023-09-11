<template>
  <Transition name="opacity">
    <div
      v-if="props.isVisible"
      class="absolute left-0 top-0 z-100 h-full w-full flex items-center justify-center rounded-[4px] bg-[#fafafccc] px-[16px] backdrop-blur-[4px] dark:bg-[#18181ccc]"
    >
      <n-space justify="space-between">
        <n-button strong type="primary" quaternary @click="copyLink">
          <template #icon>
            <i class="i-solar-copy-bold-duotone text-[16px] opacity-72" />
          </template>
          复制订阅
        </n-button>

        <n-divider vertical />

        <n-button strong type="primary" quaternary @click="editItem">
          <template #icon>
            <i class="i-solar-pen-2-bold-duotone text-[16px] opacity-72" />
          </template>
          编辑订阅
        </n-button>
      </n-space>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { storeToRefs } from 'pinia';

import { useBackendApiUrl } from '../../../../hooks/useBackendApiUrl.ts';
import { useMessage } from '../../../../hooks/useMessage.tsx';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';

const props = defineProps<{
  isVisible: boolean
  type: 'sub' | 'collection'
  name: string
}>();

const { subs, collections } = storeToRefs(useSubscriptionStore());
const { showMessage } = useMessage();
const { currentApi } = useBackendApiUrl();
const { copy } = useClipboard({ legacy: true });
const copyLink = async () => {
  if (!currentApi.value) {
    return showMessage({
      type: 'error',
      message: '后端 API 地址无效！请检查后端',
    });
  }

  const base = `${currentApi.value.url}/download${
    props.type === 'collection' ? '/collection' : ''
  }`;
  const copyText = encodeURI(`${base}/${props.name}`);

  await copy(copyText).catch((e) => {
    showMessage({
      type: 'error',
      message: `复制失败！Error: ${e}`,
    });
  });

  let displayName: string | undefined;
  if (props.type === 'collection') {
    displayName = collections.value.find(
      c => c.name === props.name,
    )?.displayName;
  } else {
    displayName = subs.value.find(s => s.name === props.name)?.displayName;
  }

  showMessage({
    type: 'success',
    message: `复制【${displayName ?? '未知'}】通用订阅链接成功！`,
  });
};

const editItem = () => {
  console.log('editItem');
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
