declare namespace Store {
  type AppState = {
    env: Utils.Env | null;
  };

  type SubscriptionState = {
    subs: Subscription.Subs;
    collections: Subscription.Collections;
    flows: Record<string, Subscription.StoreFlow>;
  };
}
