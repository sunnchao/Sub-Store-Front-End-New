export default {
  LS_KEY: 'backend-apis',
  INITIAL: {
    current: '默认',
    apis: [
      {
        name: '默认',
        url: import.meta.env.VITE_API_URL ?? 'https://sub.store',
      },
    ],
  } as Settings.BackendApiUrl,
} as const;
