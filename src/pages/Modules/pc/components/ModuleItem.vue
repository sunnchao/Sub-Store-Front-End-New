<template>
  <n-card embedded hoverable>
    <n-thing>
      <template #header>
        {{ props.module.displayName || props.module.name }}
      </template>
      <template #header-extra>
        <n-tag
          :type="props.module.url.startsWith('/api') ? 'warning' : 'success'"
        >
          {{ props.module.url.startsWith("/api") ? "本地" : "远程" }}
        </n-tag>
      </template>
    </n-thing>
  </n-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  module: Modules.BackendModule
}>();
</script>
