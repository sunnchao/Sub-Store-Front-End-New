<template>
  <h2
    class="mb-[12px] pc-secondary-title"
    :style="{ marginTop: props.marginTop ?? '0' }"
  >
    {{ props.title }}
  </h2>
  <n-grid :x-gap="12" :y-gap="12" cols="1 600:2 900:3 1200:4 1500:5 1800:6">
    <template v-if="props.dataType === 'subs'">
      <n-grid-item v-for="sub in subs" :key="sub.name">
        <SubItem :sub="sub">
          <template #action>
            <n-button size="small" @click="copyLink(sub.name)">
              复制通用订阅
            </n-button>
          </template>
        </SubItem>
      </n-grid-item>

      <n-grid-item>
        <AddItemCard item-type="sub" />
      </n-grid-item>
    </template>

    <template v-else-if="props.dataType === 'collections'">
      <n-grid-item v-for="collection in collections" :key="collection.name">
        <CollectionItem :collection="collection">
          <template #action>
            <n-button size="small" @click="copyLink(collection.name, true)">
              复制通用订阅
            </n-button>
          </template>
        </CollectionItem>
      </n-grid-item>

      <n-grid-item>
        <AddItemCard item-type="collection" />
      </n-grid-item>
    </template>
  </n-grid>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { storeToRefs } from 'pinia';

import { useBackendApiUrl } from '../../../../hooks/useBackendApiUrl.ts';
import { useMessage } from '../../../../hooks/useMessage.tsx';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';
import AddItemCard from './AddItemCard.vue';
import CollectionItem from './CollectionItem.vue';
import SubItem from './SubItem.vue';

const props = defineProps<{
  title: string
  dataType: 'subs' | 'collections'
  marginTop?: string
}>();

const subscriptionStore = useSubscriptionStore();
const { subs, collections } = storeToRefs(subscriptionStore);

const { showMessage } = useMessage();
const { currentApi } = useBackendApiUrl();
const { copy } = useClipboard({ legacy: true });
const copyLink = async (name: string, isCollection?: boolean) => {
  if (!currentApi.value) {
    return showMessage({
      type: 'error',
      message: '后端 API 地址无效！请检查后端',
    });
  }

  let base = `${currentApi.value.url}/download`;
  if (isCollection) {
    base += '/collection';
  }
  const copyText = encodeURI(`${base}/${name}`);

  await copy(copyText).catch((e) => {
    showMessage({
      type: 'error',
      message: `复制失败！Error: ${e}`,
    });
  });

  let displayName: string | undefined;
  if (isCollection) {
    displayName = collections.value.find(c => c.name === name)?.displayName;
  } else {
    displayName = subs.value.find(s => s.name === name)?.displayName;
  }

  showMessage({
    type: 'success',
    message: `复制【${displayName ?? '未知'}】通用订阅链接成功！`,
  });
};
</script>
