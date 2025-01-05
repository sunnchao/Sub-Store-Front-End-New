<template>
  <PCEditor :type="type" @submit="onSubmit" />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { useApi } from '../../hooks/useApi.ts';
import { useAppMessage } from '../../hooks/useAppMessage.tsx';
import { useScreen } from '../../hooks/useScreen.ts';
import PCEditor from './pc/PCEditor.vue';

const { isPc } = useScreen();

const route = useRoute();
const type = route.params.type as Components.SubType;

const router = useRouter();
const { showAppMessage } = useAppMessage();
const { subApi } = useApi();
const onSubmit = async (data: Subscription.Sub | Subscription.Collection) => {
  const loading = showAppMessage({
    type: 'loading',
    message: `正在创建订阅【${data.displayName}】...`,
  })!;
  if (type === 'collection') {
    const collection = data as Subscription.Collection;
    await subApi.createCollection(collection).catch(() => loading.destroy());
  } else if (type === 'sub') {
    const sub = data as Subscription.Sub;
    await subApi.createSub(sub).catch(() => loading.destroy());
  }

  router.push('/sub');

  loading.type = 'success';
  loading.content = `创建订阅【${data.displayName}】成功！`;
  setTimeout(() => loading.destroy(), 1500);
};
</script>
