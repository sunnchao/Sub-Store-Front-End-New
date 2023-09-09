<template>
  <SubPageItemCard>
    <n-thing>
      <template #avatar>
        <AutoImage :src="props.collection.icon" />
      </template>
      <template #header>
        {{ props.collection.displayName || props.sub.name }}
      </template>
      <div>
        <span
          v-for="name in props.collection.subscriptions"
          :key="name"
          class="mr-[16px] inline-flex items-center gap-x-[4px]"
        >
          <i
            class="i-carbon-direct-link inline-block text-primary-light opacity-80 dark:text-primary-dark"
          />
          <span class="text-text-tertiary-light dark:text-text-tertiary-dark">
            {{ getSubName(name) }}
          </span>
        </span>
      </div>
      <template #action>
        <slot name="action" />
      </template>
    </n-thing>
  </SubPageItemCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import AutoImage from '../../../../components/pc/AutoImage.vue';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';
import SubPageItemCard from './SubPageItemCard.vue';

const props = defineProps<{
  collection: Subscription.Collection
}>();

const subscriptionStore = useSubscriptionStore();
const { subs } = storeToRefs(subscriptionStore);
const getSubName = (collectionName: string) => {
  return subs.value.find(sub => sub.name === collectionName)?.displayName;
};
</script>
