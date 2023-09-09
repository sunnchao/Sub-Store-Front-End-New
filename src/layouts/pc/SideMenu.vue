<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="200"
    :collapsed="collapsed"
    @collapse="collapsed = true"
    @expand="collapsed = false"
  >
    <div class="h-full flex flex-col">
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
      />

      <div class="mt-auto px-[16px] pb-[24px]">
        <div v-if="!collapsed">
          <p class="text-text-primary-light dark:text-text-primary-dark">
            {{ env?.backend }} - {{ env?.version }}
          </p>
          <!--          <p -->
          <!--            class="text-text-4 dark:text-[#fff3]" -->
          <!--            @click="setCurrentApi('123')" -->
          <!--          > -->
          <!--            {{ currentApi?.url }} -->
          <!--          </p> -->
        </div>
        <div v-else>
          <p>{{ env?.backend }}</p>
        </div>
      </div>
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed, h, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useLocalSettings } from '../../hooks/useLocalSettings.ts';
import { useRequest } from '../../hooks/useRequest.ts';
import { useResponsiveRequestData } from '../../hooks/useResponsiveRequestData.ts';
import { useAppStore } from '../../store/useAppStore.ts';

const collapsed = ref(false);
const activeKey = ref('');

const { localSettings } = useLocalSettings();

const menuOptions = computed<MenuOption[]>(() => {
  return [
    {
      key: 'home',
      label: () => h(RouterLink, { to: '/home' }, { default: () => '首页' }),
      icon: () => h('div', { class: 'i-carbon-home' }),
    },
    {
      key: 'divider-1',
      type: 'divider',
    },
    {
      key: 'sub',
      label: () => h(RouterLink, { to: '/sub' }, { default: () => '订阅管理' }),
      icon: () => h('div', { class: 'i-carbon-direct-link' }),
    },
    ...(localSettings.value.isShowSyncTab
      ? [
          {
            key: 'sync',
            label: () =>
              h(RouterLink, { to: '/sync' }, { default: () => 'Gist 同步' }),
            icon: () => h('div', { class: 'i-carbon-word-cloud' }),
          },
        ]
      : []),
    {
      key: 'settings',
      label: () =>
        h(RouterLink, { to: '/settings' }, { default: () => '设置' }),
      icon: () => h('div', { class: 'i-carbon-settings' }),
    },
  ];
});

const { env } = storeToRefs(useAppStore());
const { setEnv } = useAppStore();
const { utilsApi } = useRequest();
useResponsiveRequestData(() => utilsApi.getEnv(), {
  onSucceed: d => setEnv(d),
});
</script>
