<template>
  <n-grid :x-gap="12" :y-gap="12" :cols="isPc ? 3 : 2">
    <n-grid-item v-for="item in items" :key="item.name">
      <n-card size="small">
        <n-space vertical class="items-center">
          <AutoImage :src="item.icon" always-black-white />
          <h2
            class="font-bold text-text-secondary-light dark:text-text-secondary-dark"
          >
            {{ item.name }}
          </h2>
        </n-space>

        <n-divider :style="{ marginTop: '12px', marginBottom: '12px' }" />

        <n-space justify="space-between">
          <n-button
            size="small"
            quaternary
            @click="copyLink({ ...props, proxyTool: item.tool })"
          >
            <template #icon>
              <i class="i-solar-copy-bold-duotone opacity-36" />
            </template>
            复制
          </n-button>
          <n-button
            size="small"
            quaternary
            tag="a"
            :href="getLink({ ...props, proxyTool: item.tool })"
            target="_blank"
          >
            <template #icon>
              <i class="i-solar-eye-bold-duotone opacity-56" />
            </template>
            预览
          </n-button>
        </n-space>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useCopySubsLink } from '../../../../hooks/useCopySubsLink.ts';
import { useLogo } from '../../../../hooks/useLogo.ts';
import { useScreen } from '../../../../hooks/useScreen.ts';

const props = defineProps<{
  name: string;
  type: Components.SubType;
}>();

const { copyLink, getLink } = useCopySubsLink();
const { appLogo, toolLogo } = useLogo();

const { isPc } = useScreen();

const items = computed<
  { name: string; icon: string; tool: Utils.ProxyTools }[]
>(() => [
  {
    name: '通用订阅',
    icon: appLogo.shape.value,
    tool: 'universal',
  },
  {
    name: 'Stash',
    icon: toolLogo.stash,
    tool: 'stash',
  },
  {
    name: 'Clash.Meta',
    icon: toolLogo.clashMeta,
    tool: 'clashMeta',
  },
  {
    name: 'Clash',
    icon: toolLogo.clash,
    tool: 'clash',
  },
  {
    name: 'Quantumult X',
    icon: toolLogo.quanx,
    tool: 'qx',
  },
  {
    name: 'Surge',
    icon: toolLogo.surge,
    tool: 'surge',
  },
  {
    name: 'Loon',
    icon: toolLogo.loon,
    tool: 'loon',
  },
  {
    name: 'ShadowRocket',
    icon: toolLogo.shadowrocket,
    tool: 'shadowrocket',
  },
  {
    name: 'V2Ray',
    icon: toolLogo.v2ray,
    tool: 'v2ray',
  },
]);
</script>
