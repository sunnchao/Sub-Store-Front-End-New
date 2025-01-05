<template>
  <PCCompare
    :loading="loading"
    :error="error"
    :compare-data="compareData"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { useApi } from '../../hooks/useApi.ts';
import { useScreen } from '../../hooks/useScreen.ts';
import { useSubscriptionStore } from '../../store/useSubscriptionStore.ts';
import PCCompare from './pc/PCCompare.vue';

const { isPc } = useScreen();
const { params } = useRoute();
const type = params.type as Components.SubType;
const name = params.name as string;

const store = useSubscriptionStore();
const { subApi } = useApi();
const { isInit, subs, collections } = storeToRefs(store);

const loading = ref(false);
const error = ref('');
const compareData = ref<Compare.Data | undefined>(undefined);

onMounted(async () => {
  loading.value = true;

  if (!isInit.value) {
    const subs = await subApi.getSubs();
    const collections = await subApi.getCollections();
    store.setSubs(subs);
    store.setCollections(collections);
  }

  if (type === 'sub') {
    const sub = subs.value.find(s => s.name === name);

    if (sub) {
      subApi
        .compareSub(sub)
        .then(data => (compareData.value = data))
        .catch(() => (error.value = '获取对比数据失败'))
        .finally(() => (loading.value = false));
    } else {
      error.value = '该订阅不存在，请刷新订阅页面重新进入';
      loading.value = false;
    }
  } else if (type === 'collection') {
    const collection = collections.value.find(c => c.name === name);

    if (collection) {
      subApi
        .compareCollection(collection)
        .then(data => (compareData.value = data))
        .catch(() => (error.value = '获取对比数据失败'))
        .finally(() => (loading.value = false));
    } else {
      error.value = '该订阅不存在，请刷新订阅页面重新进入';
      loading.value = false;
    }
  }
});
</script>
