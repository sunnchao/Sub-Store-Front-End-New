declare namespace Store {
  type AppState = {
    env: (Utils.Env & { logo: string }) | null;
  };

  type SubscriptionState = {
    isInit: boolean;
    subs: Subscription.Subs;
    collections: Subscription.Collections;
    flows: Record<string, Subscription.StoreFlow>;
  };

  type ModuleState = {
    isInit: boolean;
    modules: Modules.BackendModules;
  };
}
