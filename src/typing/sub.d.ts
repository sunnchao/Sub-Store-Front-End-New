declare namespace Subscription {
  type Sub = {
    content: string;
    displayName: string;
    icon: string;
    name: string;
    source: 'remote' | 'local';
    ua: string;
    url: string;
    process: Processors;
  };
  type Subs = Sub[];

  type Collection = {
    displayName: string;
    icon: string;
    name: string;
    subscriptions: string[];
    process: Processors;
  };
  type Collections = Collection[];

  type Flow = {
    expires: number;
    total: number;
    usage: {
      upload: number;
      download: number;
    };
  };
  type StoreFlow =
    | {
      status: 'loading';
    }
    | {
      status: 'success';
      data: Flow;
    }
    | {
      status: 'error';
      error: string;
    };

  type Processor = {
    type: 'Script Operator';
    args: {
      content: string;
      mode: 'link' | 'script';
    };
    id: number;
  };
  type Processors = Processor[];
}
