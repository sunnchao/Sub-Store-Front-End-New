import { defineStore } from 'pinia';

const initialState = (): Store.SubscriptionState => ({
  subs: [],
  collections: [],
});

export const useSubscriptionStore = defineStore('subscription', {
  state: initialState,
  actions: {
    setSubs(subs: Subscription.Subs) {
      this.subs = subs;
    },
    setCollections(collections: Subscription.Collections) {
      this.collections = collections;
    },
    reset() {
      this.$reset();
    },
  },
});
