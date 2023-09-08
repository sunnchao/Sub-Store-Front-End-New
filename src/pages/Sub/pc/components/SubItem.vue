<template>
  <SubPageItemCard>
    <n-thing>
      <template #avatar>
        <div class="aspect-1 w-[36px]">
          <img
            :src="props.sub.icon || props.defaultIcon"
            alt="sub icon"
            class="h-full w-full object-contain"
          >
        </div>
      </template>
      <template #header>
        {{ props.sub.displayName }}
      </template>
      <template #header-extra>
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
      </template>

      <div
        class="h-[48px] flex items-center py-[8px] text-text-3 dark:text-[#fffa]"
      >
        <div
          v-if="flow.status === 'loading'"
          class="w-full flex items-center gap-x-[8px]"
        >
          <n-spin size="small" />
          <span>正在获取流量信息...</span>
        </div>

        <div
          v-else-if="flow.status === 'error'"
          class="w-full flex items-center gap-x-[4px]"
        >
          <i
            class="i-solar-confounded-square-bold-duotone text-[24px] opacity-72"
          />
          <span>流量获取失败：<span class="text-text-2 dark:text-[#fffd]">
            {{ flow.error }}</span>
          </span>
        </div>

        <div
          v-else-if="flow.status === 'success'"
          class="w-full flex flex-col justify-center gap-y-[2px]"
        >
          <span class="flex items-center justify-between"><span>{{ progress.usageText }}</span><span>{{ progress.remainingText }}</span></span>
          <n-progress
            type="line"
            :status="progress.progressType"
            :percentage="progress.percentage"
            indicator-placement="outside"
          >
            {{ progress.percentage.toFixed() }}%
          </n-progress>
        </div>
      </div>

      <template #action>
        <slot name="action" />
      </template>
    </n-thing>
  </SubPageItemCard>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';
import { formatFlow } from '../../../../utils/formatFlow.ts';
import SubPageItemCard from './SubPageItemCard.vue';

const props = defineProps<{
  sub: Subscription.Sub
  defaultIcon: string
}>();

const subscriptionStore = useSubscriptionStore();
const { flows } = storeToRefs(subscriptionStore);
const flow = computed<Subscription.StoreFlow>(() => flows.value[props.sub.url]);

const progress = computed(() => {
  const obj = {
    percentage: 0,
    progressType: 'success',
    usageText: '',
    expiresText: '',
    remainingText: '',
  };
  if (flow.value.status !== 'success') return obj;

  const usage = flow.value.data.usage.download + flow.value.data.usage.upload;
  const percentage = (usage / flow.value.data.total) * 100;
  const progressType
    = percentage > 85 ? 'error' : percentage > 50 ? 'warning' : 'success';

  const flowInfo = formatFlow(flow.value.data);
  return {
    percentage,
    progressType,
    usageText: `${flowInfo.usage.flow.toFixed(1)}${flowInfo.usage.unit} / ${
      flowInfo.total.flow
    }${flowInfo.total.unit} `,
    expiresText: flowInfo.expires.format('YYYY-MM-DD'),
    remainingText: `${flowInfo.remainDays}天后过期`,
  };
});
</script>
