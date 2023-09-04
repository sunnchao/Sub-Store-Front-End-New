<template>
  <n-layout>
    <HeaderBar class-name="h-[64px] px-[16px]" />

    <n-layout has-sider class="h-[calc(100vh_-_64px)]">
      <SideMenu />

      <n-layout-content class="overflow-auto">
        <main class="px-[36px] py-[24px]">
          <router-view />
        </main>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import HeaderBar from './HeaderBar.vue';
import SideMenu from './SideMenu.vue';
</script>
