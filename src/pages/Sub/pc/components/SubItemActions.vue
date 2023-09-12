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
          <n-button strong type="primary" quaternary @click="copyLink">
            <template #icon>
              <i class="i-solar-copy-bold-duotone text-[16px] opacity-72" />
            </template>
            通用订阅
          </n-button>
        </n-grid-item>

        <n-grid-item class="flex justify-center">
          <n-button strong type="primary" quaternary @click="editItem">
            <template #icon>
              <i
                class="i-solar-link-circle-bold-duotone text-[18px] opacity-72"
              />
            </template>
            专用订阅
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
      </n-grid>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { storeToRefs } from 'pinia';

import { useAppMessage } from '../../../../hooks/useAppMessage.tsx';
import { useBackendApiUrl } from '../../../../hooks/useBackendApiUrl.ts';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';

const props = defineProps<{
  isVisible: boolean
  type: 'sub' | 'collection'
  name: string
}>();

const { subs, collections } = storeToRefs(useSubscriptionStore());
const { showAppMessage } = useAppMessage();
const { currentApi } = useBackendApiUrl();
const { copy } = useClipboard({ legacy: true });
const copyLink = async () => {
  if (!currentApi.value) {
    return showAppMessage({
      type: 'error',
      message: '后端 API 地址无效！请检查后端',
    });
  }

  const base = `${currentApi.value.url}/download${
    props.type === 'collection' ? '/collection' : ''
  }`;
  const copyText = encodeURI(`${base}/${props.name}`);

  await copy(copyText).catch((e) => {
    showAppMessage({
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

  showAppMessage({
    type: 'success',
    message: `复制【${displayName ?? '未知'}】通用订阅链接成功！`,
  });
};

const router = useRouter();
const editItem = () => {
  console.log('editItem');
  router.push(`/edit/${props.type}/${props.name}`);
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
