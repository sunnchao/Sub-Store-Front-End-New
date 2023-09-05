declare namespace Subscription {
  type Sub = {
    content: string;
    displayName: string;
    icon: string;
    name: string;
    source: "remote" | "local";
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

  type Processor = unknown;
  type Processors = Processor[];
}
