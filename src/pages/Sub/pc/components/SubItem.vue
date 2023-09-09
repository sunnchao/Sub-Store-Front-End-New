<template>
  <SubPageItemCard>
    <n-thing>
      <template #avatar>
        <AutoImage :src="props.sub.icon" />
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
            <span>流量获取失败：<span
              class="text-text-secondary-light dark:text-text-secondary-dark"
            >
              {{ flow.error }}</span>
            </span>
          </div>

          <div
            v-else-if="flow.status === 'success'"
            class="w-full flex flex-col justify-center gap-y-[4px]"
          >
            <span class="flex items-center justify-between"><span>{{ progress.usageText }}</span><span>{{ progress.remainingText }}</span></span>
            <n-progress
              type="line"
              :status="progress.progressType"
              :percentage="progress.percentage"
              :show-indicator="false"
            >
              {{ progress.percentage.toFixed() }}%
            </n-progress>
          </div>
        </template>
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

import AutoImage from '../../../../components/pc/AutoImage.vue';
import { useSubscriptionStore } from '../../../../store/useSubscriptionStore.ts';
import { formatFlow } from '../../../../utils/formatFlow.ts';
import SubPageItemCard from './SubPageItemCard.vue';

const props = defineProps<{
  sub: Subscription.Sub
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
    usageText: `${flowInfo.usage.flow.toFixed(1)} ${flowInfo.usage.unit} / ${
      flowInfo.total.flow.toFixed(1).endsWith('.0')
        ? flowInfo.total.flow.toFixed()
        : flowInfo.total.flow.toFixed(1)
    } ${flowInfo.total.unit} `,
    expiresText: flowInfo.expires
      ? flowInfo.expires.format('YYYY-MM-DD')
      : '无到期时间',
    remainingText:
      flowInfo.remainDays !== null
        ? `${flowInfo.remainDays}天后过期`
        : '无到期时间',
  };
});
</script>
