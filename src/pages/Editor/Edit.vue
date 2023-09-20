<template>
  <PCEditor v-if="isPc" :type="type" :name="name" @submit="onSubmit" />
  <H5Editor v-else />
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import { useApi } from '../../hooks/useApi.ts';
import { useAppMessage } from '../../hooks/useAppMessage.tsx';
import { useScreen } from '../../hooks/useScreen.ts';
import H5Editor from './h5/H5Editor.vue';
import PCEditor from './pc/PCEditor.vue';

const { isPc } = useScreen();

const route = useRoute();
const type = route.params.type as Components.SubType;
const name = route.params.name as string;

const router = useRouter();
const { showAppMessage } = useAppMessage();
const { subApi } = useApi();
const onSubmit = async (data: Subscription.Sub | Subscription.Collection) => {
  const loading = showAppMessage({
    type: 'loading',
    message: '正在更新订阅...',
  })!;
  if (type === 'collection') {
    const collection = data as Subscription.Collection;
    await subApi
      .updateCollection(name, collection)
      .catch(() => loading.destroy());
  } else if (type === 'sub') {
    const sub = data as Subscription.Sub;
    await subApi.updateSub(name, sub).catch(() => loading.destroy());
  }

  router.push('/sub');

  loading.type = 'success';
  loading.content = '更新订阅成功！';
  setTimeout(() => loading.destroy(), 1500);
};
</script>
