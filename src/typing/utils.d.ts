declare namespace Utils {
  type ProxyTools =
    | "general"
    | "clash"
    | "clashMeta"
    | "v2ray"
    | "surge"
    | "qx"
    | "loon"
    | "shadowrocket"
    | "stash";

  type Backend = "Node" | "Surge" | "QX" | "Loon" | "Stash" | "ShadowRocket";

  type Env = {
    backend: Backend;
    version: string;
  };
}
