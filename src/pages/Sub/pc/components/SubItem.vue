<template>
  <n-card ref="card" embedded hoverable>
    <SubItemActions
      :is-visible="isCardHovered"
      type="sub"
      :name="props.sub.name"
    />

    <n-thing>
      <template #avatar>
        <AutoImage :src="props.sub.icon" />
      </template>
      <template #header>
        {{ props.sub.displayName || props.sub.name }}
      </template>
      <div
        class="h-[48px] flex items-center py-[8px] text-text-tertiary-light dark:text-text-tertiary-dark"
      >
        <n-tag
          :type="
            props.sub.source === 'remote'
              ? 'success'
              : props.sub.source === 'local'
                ? 'warning'
                : 'default'
          "
        >
          {{
            props.sub.source === "remote"
              ? "远程"
              : props.sub.source === "local"
                ? "本地"
                : "未知"
          }}
        </n-tag>
      </div>
      <div
        class="h-[48px] flex items-center py-[8px] text-text-tertiary-light dark:text-text-tertiary-dark"
      >
        <div
          v-if="props.sub.source === 'local'"
          class="w-full flex items-center gap-x-[4px]"
        >
          <i class="i-solar-smile-square-bold-duotone text-[24px] opacity-72" />
          <span>本地订阅无流量信息哦～</span>
        </div>

        <template v-else-if="props.sub.source === 'remote'">
          <div
            v-if="flow?.status === 'loading'"
            class="w-full flex items-center gap-x-[8px]"
          >
            <n-spin size="small" />
            <span>正在获取流量信息...</span>
          </div>

          <div
            v-else-if="flow?.status === 'error'"
            class="w-full flex items-center gap-x-[4px]"
          >
            <i
              class="i-solar-confounded-square-bold-duotone text-[24px] opacity-72"
            />
            <span>流量获取失败：<span
              class="text-text-secondary-light dark:text-text-secondary-dark"
            >
              {{ flow.error }}</span>
            </span>
          </div>

          <div
            v-else-if="flow?.status === 'success'"
            class="w-full flex flex-col justify-center gap-y-[4px]"
          >
            <span class="flex items-center justify-between"><span>{{ flowInfo.usageText }}</span><span>{{ flowInfo.remainingText }}</span></span>
            <n-progress
              type="line"
              :status="progressInfo.status"
              :percentage="progressInfo.percentage"
              :show-indicator="false"
            >
              {{ progressInfo.percentage.toFixed() }}%
            </n-progress>
          </div>
        </template>
      </div>
    </n-thing>
  </n-card>
</template>

<script setup lang="ts">
import { useElementHover } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import AutoImage from '../../../../components/pc/AutoImage.vue';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';
import { formatFlow } from '../../../../utils/formatFlow.ts';
import SubItemActions from './SubItemActions.vue';

const props = defineProps<{
  sub: Subscription.Sub;
}>();

const subscriptionStore = useSubscriptionStore();
const { flows } = storeToRefs(subscriptionStore);
const flow = computed<Subscription.StoreFlow>(() => flows.value[props.sub.url]);

type ProgressInfo = {
  status: 'default' | 'success' | 'error' | 'warning' | 'info';
  percentage: number;
};
const progressInfo = computed<ProgressInfo>(() => {
  if (flow.value?.status !== 'success') {
    return {
      percentage: 0,
      status: 'success',
    };
  }
  const usage = flow.value.data.usage.download + flow.value.data.usage.upload;
  const percentage = (usage / flow.value.data.total) * 100;
  const status
    = percentage > 85 ? 'error' : percentage > 50 ? 'warning' : 'success';
  return {
    percentage,
    status,
  };
});

type FlowInfo = {
  usageText: string;
  expiresText: string;
  remainingText: string;
};
const flowInfo = computed<FlowInfo>(() => {
  const formattedFlow
    = flow.value.status !== 'success' ? null : formatFlow(flow.value.data);
  if (!formattedFlow) {
    return {
      usageText: '',
      expiresText: '',
      remainingText: '',
    };
  }

  const { usage, total, expires, remainDays } = formattedFlow;

  const usageText = `${usage.flow.toFixed(1)} ${usage.unit}`;
  const totalText = total.flow.toFixed(1).endsWith('.0')
    ? `${total.flow.toFixed()} ${total.unit}`
    : `${total.flow.toFixed(1)} ${total.unit}`;

  return {
    usageText: `${usageText} / ${totalText}`,
    expiresText: expires ? expires.format('YYYY-MM-DD') : '无到期时间',
    remainingText: remainDays !== null ? `${remainDays}天后过期` : '无到期时间',
  };
});

const card = ref<HTMLElement | null>(null);
const isCardHovered = useElementHover(card);
</script>
