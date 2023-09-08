type Settings = {
  LS_KEY: string
  INITIAL: Settings.Local
};

const settings: Settings = {
  LS_KEY: 'local-settings',
  INITIAL: {
    isCompactMode: false,
    isOriginalIcon: false,
    isShowCommonSettings: false,
    isShowSyncTab: false,
  },
};

export default settings;
