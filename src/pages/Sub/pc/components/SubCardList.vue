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
        <SubItem :sub="sub" />
      </n-grid-item>

      <n-grid-item>
        <AddItemCard item-type="sub" />
      </n-grid-item>
    </template>

    <template v-else-if="props.dataType === 'collections'">
      <n-grid-item v-for="collection in collections" :key="collection.name">
        <CollectionItem :collection="collection" />
      </n-grid-item>

      <n-grid-item>
        <AddItemCard item-type="collection" />
      </n-grid-item>
    </template>
  </n-grid>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

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
</script>
