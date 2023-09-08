<template>
  <div
    v-if="!props.subs.length && !props.collections.length"
    class="min-h-[320px] flex items-center justify-center"
  >
    <n-spin
      v-if="props.isSubLoading || props.isCollectionLoading"
      size="medium"
    />
    <n-empty v-else description="暂无订阅" size="huge">
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

  <div>
    <SubPageCardList
      v-if="props.subs.length"
      title="单条订阅"
      :subs="props.subs"
      :collections="props.collections"
      :default-icon="defaultIcon"
      data-type="subs"
    />

    <SubPageCardList
      v-if="props.collections.length"
      margin-top="48px"
      title="组合订阅"
      :subs="props.subs"
      :collections="props.collections"
      :default-icon="defaultIcon"
      data-type="collections"
    />
  </div>
</template>

<script setup lang="ts">
import { useOsTheme } from 'naive-ui';
import { computed } from 'vue';

import { useLogo } from '../../../hooks/useLogo.ts';
import SubPageCardList from './components/SubPageCardList.vue';

const props = defineProps<{
  subs: Subscription.Subs
  collections: Subscription.Collections
  isSubLoading: boolean
  isCollectionLoading: boolean
}>();

const {
  logo: { darkShape, lightShape },
} = useLogo();
const theme = useOsTheme();
const defaultIcon = computed(() =>
  theme.value === 'dark' ? darkShape : lightShape,
);
</script>
