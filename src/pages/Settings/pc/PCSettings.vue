<template>
  <div>
    <div>
      <h2>外观设置</h2>

      <div>
        <p>订阅图标展示原始颜色</p>
        <n-switch
          :value="localSettings.isOriginalIcon"
          @change="(v) => (localSettings.isOriginalIcon = v)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalSettings } from '../../../hooks/useLocalSettings.ts';

const { localSettings } = useLocalSettings();
</script>
