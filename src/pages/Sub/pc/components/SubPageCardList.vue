<template>
  <h2
    class="pc-secondary-title mb-[12px]"
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
const copyLink = (name: string, isCollection?: boolean) => {
  if (!currentApi.value) {
    showMessage({
      type: 'error',
      message: '后端 API 地址无效！请检查后端',
    });
    return;
  }

  console.log(
    `${currentApi.value.url}/download/${
      isCollection ? 'collection/' : ''
    }${name}`,
  );
  const { displayName } = subs.value.find(sub => sub.name === name)!;
  showMessage({
    type: 'success',
    message: `复制【${displayName}】通用订阅链接成功！`,
  });
};
</script>
