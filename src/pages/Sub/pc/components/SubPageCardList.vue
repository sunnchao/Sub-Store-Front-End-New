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
            <n-button>123</n-button>
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
            <n-button>456</n-button>
          </template>
        </CollectionItem>
      </n-grid-item>
    </template>
  </n-grid>
</template>

<script setup lang="ts">
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
</script>
