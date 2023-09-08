<template>
  <SubPageItemCard>
    <n-thing>
      <template #avatar>
        <div class="aspect-1 w-[36px]">
          <img
            :src="props.collection.icon || props.defaultIcon"
            alt="sub icon"
            class="h-full w-full object-contain"
          >
        </div>
      </template>
      <template #header>
        {{ props.collection.displayName }}
      </template>
      <div>
        <span
          v-for="name in props.collection.subscriptions"
          :key="name"
          class="mr-[16px] inline-flex items-center gap-x-[4px]"
        >
          <i
            class="i-carbon-direct-link inline-block text-text-4 dark:text-[#fff6]"
          />
          <span class="text-text-3 dark:text-[#fff9]">
            {{ props.subs.find((sub) => sub.name === name)?.displayName }}
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
import SubPageItemCard from './SubPageItemCard.vue';

const props = defineProps<{
  subs: Subscription.Subs
  collection: Subscription.Collection
  defaultIcon: string
}>();
</script>
