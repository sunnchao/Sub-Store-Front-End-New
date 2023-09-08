declare namespace Settings {
  // 后端 API 地址
  type BackendApi = {
    name: string;
    url: string;
  };
  type BackendApis = BackendApi[];
  type BackendApiUrl = {
    current: string;
    apis: BackendApis;
  };

  type Response = {
    artifactStore: string;
    avatarUrl: string;
    gistToken: string;
    githubUser: string;
    syncTime: number;
    // theme: { auto: boolean; name: "light"; dark: "dark"; light: "light" };
  };

  type Local = {
    isCompactMode: boolean;
    isOriginalIcon: boolean;
    isShowCommonSettings: boolean;
    isShowSyncTab: boolean;
  };
}
