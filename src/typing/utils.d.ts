declare namespace Utils {
  type Backend = "Node" | "Surge" | "QX" | "Loon" | "Stash" | "ShadowRocket";

  type Env = {
    backend: Backend;
    version: string;
  };
}
