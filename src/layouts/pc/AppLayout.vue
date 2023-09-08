<template>
  <n-layout>
    <HeaderBar class-name="h-[64px] px-[16px]" />

    <n-layout has-sider class="h-[calc(100vh_-_64px)]">
      <SideMenu />

      <n-layout-content class="overflow-auto">
        <main class="px-[36px] py-[24px]">
          <h1 class="text-[22px] font-bold text-text-2">
            {{ title }}
          </h1>
          <n-divider class="my-[16px]" />
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </main>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import HeaderBar from './HeaderBar.vue';
import SideMenu from './SideMenu.vue';

const route = useRoute();
const title = computed(() => route.meta.title);
</script>

<style scoped>
.fade-enter-active {
  transition: all 0.2s;
}

.fade-leave-active {
  transition: all 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
