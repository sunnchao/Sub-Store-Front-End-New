<template>
  <n-card ref="card" embedded hoverable>
    <SubItemActions
      type="collection"
      :name="props.collection.name"
      :is-visible="isCardHovered"
    />

    <n-thing>
      <template #avatar>
        <AutoImage :src="props.collection.icon" />
      </template>
      <template #header>
        {{ props.collection.displayName || props.collection.name }}
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
    </n-thing>
  </n-card>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import AutoImage from '../../../../components/pc/AutoImage.vue';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';
import SubItemActions from './SubItemActions.vue';

const props = defineProps<{
  collection: Subscription.Collection
}>();

const subscriptionStore = useSubscriptionStore();
const { subs } = storeToRefs(subscriptionStore);
const getSubName = (collectionName: string) => {
  return subs.value.find(sub => sub.name === collectionName)?.displayName;
};

const card = ref<HTMLElement | null>(null);
const isCardHovered = useElementHover(card);
</script>
