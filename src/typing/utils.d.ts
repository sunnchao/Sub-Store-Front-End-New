declare namespace Utils {
  type Backend = "Node" | "Surge" | "QuantumultX" | "Loon" | "Clash";

  type Env = {
    backend: Backend;
    version: string;
  };
}
