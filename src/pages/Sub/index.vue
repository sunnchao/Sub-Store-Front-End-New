<template>
  <PCSub v-if="isPc" :subs="subs" :collections="collections" />
  <H5Sub v-else />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useRequest } from '../../hooks/useRequest.ts';
import { useResponsiveRequestData } from '../../hooks/useResponsiveRequestData.ts';
import { useScreen } from '../../hooks/useScreen';
import { useSubscriptionStore } from '../../store/useSubscriptionStore.ts';
import H5Sub from './h5/H5Sub.vue';
import PCSub from './pc/PCSub.vue';

const { isPc } = useScreen();

const subscriptionStore = useSubscriptionStore();
const { setSubs, setCollections } = subscriptionStore;
const { subs, collections } = storeToRefs(subscriptionStore);

const { subApi } = useRequest();
useResponsiveRequestData(() => subApi.getSubs(), {
  onSucceed: setSubs,
});
useResponsiveRequestData(() => subApi.getCollections(), {
  onSucceed: setCollections,
});
</script>
