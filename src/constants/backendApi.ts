type BackendApi = {
  LS_KEY: string
  INITIAL: Settings.BackendApiUrl
};

const backendApi: BackendApi = {
  LS_KEY: 'backend-apis',
  INITIAL: {
    current: '默认',
    apis: [
      {
        name: '默认',
        url: import.meta.env.VITE_API_URL ?? 'https://sub.store',
      },
    ],
  },
};

export default backendApi;
