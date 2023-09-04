declare namespace Settings {
  // 后端 API 地址
  type BackendApi = {
    name: string
    url: string
  };
  type BackendApis = BackendApi[];
  type BackendApiUrl = {
    current: string
    apis: BackendApis
  };
}
