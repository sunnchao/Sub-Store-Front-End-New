declare namespace Subscription {
  type Flow = {
    expires: number;
    total: number;
    usage: {
      upload: number;
      download: number;
    };
  };
}
