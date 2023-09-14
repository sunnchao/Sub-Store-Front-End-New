<template>
  <div>
    <div
      v-if="props.loading && !modules.length"
      class="min-h-[320px] flex items-center justify-center"
    >
      <n-spin size="medium" />
    </div>

    <template v-else>
      <div
        v-if="!modules.length"
        class="min-h-[320px] flex items-center justify-center"
      >
        <n-empty description="暂无模块" size="huge">
          <template #icon>
            <i class="i-solar-confounded-square-bold-duotone block" />
          </template>
          <template #extra>
            <n-button size="small" @click="router.push('/create/module')">
              新增模块
            </n-button>
          </template>
        </n-empty>
      </div>

      <div v-else>
        <ModulePageCardList />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useModuleStore } from '../../../store/useModuleStore.ts';
import ModulePageCardList from './components/ModulePageCardList.vue';

const props = defineProps<{
  loading: boolean
}>();

const store = useModuleStore();
const { modules } = storeToRefs(store);

const router = useRouter();
</script>
