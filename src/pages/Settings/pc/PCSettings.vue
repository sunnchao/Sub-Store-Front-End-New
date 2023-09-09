<template>
  <div>
    <div>
      <h2 class="pc-secondary-title">
        外观设置
      </h2>

      <Switcher
        content="订阅图标使用原始颜色"
        :value="localSettings.isOriginalIcon"
        @change="(v) => (localSettings.isOriginalIcon = v)"
      />
      <Switcher
        content="展示 &quot;Gist 同步&quot; 页面"
        :value="localSettings.isShowSyncTab"
        @change="(v) => (localSettings.isShowSyncTab = v)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalSettings } from '../../../hooks/useLocalSettings.ts';
import Switcher from './components/Switcher.vue';

const { localSettings } = useLocalSettings();
</script>
