import { defineStore } from 'pinia';

import { useRequest } from '../hooks/useRequest.ts';

const initialState = (): Store.SubscriptionState => ({
  subs: [],
  collections: [],
  flows: {},
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
    getFlows() {
      const { subApi, parseError } = useRequest();
      const urlList = [
        ...new Set(
          this.subs
            .filter(sub => sub.source === 'remote')
            .map(sub => sub.url),
        ),
      ];
      // 遍历请求流量
      for (const url of urlList) {
        const isExist = this.flows[url];
        if (isExist) continue;
        this.flows[url] = { status: 'loading' };
        const name = this.subs.find(sub => sub.url === url)!.name;
        subApi
          .getFlow(name)
          .then(flow => (this.flows[url] = { status: 'success', data: flow }))
          .catch((err) => {
            this.flows[url] = {
              status: 'error',
              error: parseError(err).message,
            };
          });
      }
    },
    reset() {
      this.$reset();
    },
  },
});
