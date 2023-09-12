<template>
  <div>
    <div
      v-if="
        props.isSubLoading
          && props.isCollectionLoading
          && !subs.length
          && !collections.length
      "
      class="min-h-[320px] flex items-center justify-center"
    >
      <n-spin size="medium" />
    </div>

    <template v-else>
      <div
        v-if="!subs.length && !collections.length"
        class="min-h-[320px] flex items-center justify-center"
      >
        <n-empty description="暂无订阅" size="huge">
          <template #icon>
            <i class="i-solar-confounded-square-bold-duotone block" />
          </template>
          <template #extra>
            <n-button size="small">
              新增订阅
            </n-button>
          </template>
        </n-empty>
      </div>

      <div v-else>
        <n-modal
          v-model:show="previewIsVisible"
          preset="card"
          title="专用订阅"
          :style="{ width: '700px' }"
          size="huge"
          :bordered="false"
        >
          <MultiplePlatformPreviewPopup
            :name="previewSubName"
            :type="previewSubType"
          />
        </n-modal>

        <SubPageCardList title="单条订阅" data-type="subs" />

        <SubPageCardList
          margin-top="48px"
          title="组合订阅"
          data-type="collections"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSubscriptionStore } from '../../../store/useSubscriptionStore.ts';
import MultiplePlatformPreviewPopup from './components/MultiplePlatformPreviewPopup.vue';
import SubPageCardList from './components/SubCardList.vue';

const props = defineProps<{
  isSubLoading: boolean
  isCollectionLoading: boolean
}>();

const subscriptionStore = useSubscriptionStore();
const { subs, collections } = storeToRefs(subscriptionStore);

// 多平台预览注入
const previewSubName = ref('');
const previewSubType = ref<Components.SubType>('sub');
const previewIsVisible = ref(false);
const openMultiplePlatformPreview = ({
  name,
  type,
}: Components.PreviewInfo) => {
  previewSubName.value = name;
  previewSubType.value = type;
  previewIsVisible.value = true;
};
provide<Components.PreviewMultiplePlatform>(
  'previewMultiplePlatform',
  openMultiplePlatformPreview,
);
</script>
