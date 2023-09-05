<template>
  <n-layout-sider
    bordered
    collapse-mode="width"
    :collapsed-width="64"
    :width="240"
    :collapsed="collapsed"
    show-trigger
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
        当前后端: {{ env?.backend }} - {{ env?.version }}
        <p @click="setCurrentApi('123')">
          {{ currentApi?.url }}
        </p>
        <p @click="setCurrentApi('默认')">
          {{ loading }}
        </p>
      </div>
    </div>
  </n-layout-sider>
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { h, ref } from 'vue';
import { RouterLink } from 'vue-router';

import { useBackendApiUrl } from '../../hooks/useBackendApiUrl';
import { useRequest } from '../../hooks/useRequest.ts';
import { useResponsiveRequestData } from '../../hooks/useResponsiveRequestData.ts';
import { useAppStore } from '../../store/useAppStore.ts';

const { currentApi, setCurrentApi } = useBackendApiUrl();

const collapsed = ref(false);
const activeKey = ref('home');

const menuOptions: MenuOption[] = [
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
  {
    key: 'sync',
    label: () => h(RouterLink, { to: '/sync' }, { default: () => 'Gist 同步' }),
    icon: () => h('div', { class: 'i-carbon-word-cloud' }),
  },
  {
    key: 'settings',
    label: () => h(RouterLink, { to: '/settings' }, { default: () => '设置' }),
    icon: () => h('div', { class: 'i-carbon-settings' }),
  },
];

const { env } = storeToRefs(useAppStore());
const { setEnv } = useAppStore();
const { utilsApi } = useRequest();
const { data, error, loading } = useResponsiveRequestData(
  () => utilsApi.getEnv(),
  { onSucceed: d => setEnv(d) },
);
</script>
