<template>
  <PCSub
    v-if="isPc"
    :is-sub-loading="subLoading"
    :is-collection-loading="collectionLoading"
  />
  <H5Sub v-else />
</template>

<script setup lang="ts">
import { tryOnBeforeUnmount } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

import { useRequest } from '../../hooks/useRequest.ts';
import { useResponsiveRequestData } from '../../hooks/useResponsiveRequestData.ts';
import { useScreen } from '../../hooks/useScreen';
import { useSubscriptionStore } from '../../store/useSubscriptionStore.ts';
import H5Sub from './h5/H5Sub.vue';
import PCSub from './pc/PCSub.vue';

const { isPc } = useScreen();

const subscriptionStore = useSubscriptionStore();
const { setSubs, setCollections } = subscriptionStore;
const { subs } = storeToRefs(subscriptionStore);

const { subApi } = useRequest();
const { loading: subLoading } = useResponsiveRequestData(
  () => subApi.getSubs(),
  { onSucceed: setSubs },
);
const { loading: collectionLoading } = useResponsiveRequestData(
  () => subApi.getCollections(),
  { onSucceed: setCollections },
);

const stop = watch(subs, () => {
  subscriptionStore.getFlows();
});
tryOnBeforeUnmount(() => {
  stop();
});
</script>
