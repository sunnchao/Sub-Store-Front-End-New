<template>
  <n-layout>
    <HeaderBar class-name="h-[64px] px-[16px]" />

    <n-layout has-sider class="h-[calc(100vh_-_64px)]">
      <SideMenu />

      <n-layout-content class="overflow-auto">
        <main class="px-[36px] py-[24px]">
          <div class="flex items-center gap-x-[16px]">
            <h1
              class="inline-block text-[22px] font-bold text-text-primary-light dark:text-text-primary-dark"
            >
              {{ title }}
            </h1>

            <SubPageTitleRefreshButton v-if="route.name === 'Sub'" />
          </div>

          <n-divider class="my-[16px]" />
          <router-view v-slot="{ Component }">
            <Transition name="fade" mode="out-in">
              <component :is="Component" :key="route.fullPath" />
            </Transition>
          </router-view>
        </main>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import SubPageTitleRefreshButton from '../../components/pc/SubPageTitleRefreshButton.vue';
import HeaderBar from './HeaderBar.vue';
import SideMenu from './SideMenu.vue';

const route = useRoute();
const title = computed(() => {
  if (route.name === 'Compare') {
    return `${route.params.name} 处理结果对比`;
  } else if (route.name === 'CreateSub' || route.name === 'EditSub') {
    const type = route.params.type === 'sub' ? '单条订阅' : '组合订阅';
    switch (route.name) {
      case 'CreateSub':
        return `创建${type}`;
      case 'EditSub':
        return `编辑${type} ${route.params.name}`;
      default:
        return '';
    }
  }
  return route.meta.title;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
