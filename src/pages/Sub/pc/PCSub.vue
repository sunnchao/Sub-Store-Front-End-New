<template>
  <div>
    <h1 class="mb-[12px] text-[18px] font-bold">
      单条订阅
    </h1>
    <n-grid :x-gap="12" :y-gap="12" cols="1 600:2 900:3 1200:4 1500:5 1800:6">
      <n-grid-item v-for="sub in props.subs" :key="sub.name">
        <n-card embedded>
          <n-thing>
            <template #avatar>
              <div class="aspect-1 w-[44px]">
                <img
                  :src="sub.icon || defaultIcon"
                  alt="sub icon"
                  class="h-full w-full object-contain"
                >
              </div>
            </template>
            <template #header>
              {{ sub.displayName }}
            </template>
            <template #header-extra>
              <n-tag
                :type="
                  sub.source === 'remote'
                    ? 'success'
                    : sub.source === 'local'
                      ? 'warning'
                      : 'default'
                "
              >
                {{
                  sub.source === "remote"
                    ? "远程"
                    : sub.source === "local"
                      ? "本地"
                      : "未知"
                }}
              </n-tag>
            </template>
            <template #action>
              <n-space>
                <n-button size="small">
                  <template #icon>
                    <div class="i-carbon-edit" />
                  </template>
                  操作
                </n-button>
              </n-space>
            </template>
          </n-thing>
        </n-card>
      </n-grid-item>
    </n-grid>

    <h1 class="mb-[12px] mt-[36px] text-[18px] font-bold">
      组合订阅
    </h1>
    <n-grid :x-gap="12" :y-gap="12" cols="1 600:2 900:3 1200:4 1500:5 1800:6">
      <n-grid-item
        v-for="collection in props.collections"
        :key="collection.name"
      >
        <n-card embedded>
          <n-thing>
            <template #avatar>
              <div class="aspect-1 w-[44px]">
                <img
                  :src="collection.icon || defaultIcon"
                  alt="sub icon"
                  class="h-full w-full object-contain"
                >
              </div>
            </template>
            <template #header>
              {{ collection.displayName }}
            </template>
            包含：<span
              v-for="name in collection.subscriptions"
              :key="name"
              class="mr-[8px]"
            >{{ subs.find((sub) => sub.name === name)!.displayName }}</span>
            <template #action>
              <n-space>
                <n-button size="small">
                  <template #icon>
                    <div class="i-carbon-edit" />
                  </template>
                  操作
                </n-button>
              </n-space>
            </template>
          </n-thing>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { useOsTheme } from 'naive-ui';
import { computed } from 'vue';

import { useLogo } from '../../../hooks/useLogo.ts';

const props = defineProps<{
  subs: Subscription.Subs
  collections: Subscription.Collections
}>();

const {
  logo: { darkRounded, lightRounded },
} = useLogo();
const theme = useOsTheme();
const defaultIcon = computed(() =>
  theme.value === 'dark' ? darkRounded : lightRounded,
);
</script>
