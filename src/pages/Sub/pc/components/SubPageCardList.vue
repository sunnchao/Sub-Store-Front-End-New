<template>
  <h1
    class="mb-[12px] text-[18px] font-bold"
    :class="`mt-[${props.marginTop}]`"
  >
    {{ props.title }}
  </h1>
  <n-grid :x-gap="12" :y-gap="12" cols="1 600:2 900:3 1200:4 1500:5 1800:6">
    <template v-if="props.dataType === 'subs'">
      <n-grid-item v-for="sub in props.subs" :key="sub.name">
        <SubItem :sub="sub" :default-icon="defaultIcon">
          <template #action>
            <n-button size="small" @click="copyLink(sub.name)">
              复制通用订阅
            </n-button>
          </template>
        </SubItem>
      </n-grid-item>
    </template>

    <template v-else-if="props.dataType === 'collections'">
      <n-grid-item
        v-for="collection in props.collections"
        :key="collection.name"
      >
        <CollectionItem
          :collection="collection"
          :default-icon="defaultIcon"
          :subs="props.subs"
        >
          <template #action>
            <n-button size="small" @click="copyLink(collection.name, true)">
              复制通用订阅
            </n-button>
          </template>
        </CollectionItem>
      </n-grid-item>
    </template>
  </n-grid>
</template>

<script setup lang="ts">
import { useBackendApiUrl } from '../../../../hooks/useBackendApiUrl.ts';
import { useMessage } from '../../../../hooks/useMessage.tsx';
import CollectionItem from './CollectionItem.vue';
import SubItem from './SubItem.vue';

const props = defineProps<{
  title: string
  subs: Subscription.Subs
  collections: Subscription.Collections
  defaultIcon: string
  dataType: 'subs' | 'collections'
  marginTop?: string
}>();

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
  const { displayName } = props.subs.find(sub => sub.name === name)!;
  showMessage({
    type: 'success',
    message: `复制【${displayName}】通用订阅链接成功！`,
  });
};
</script>
